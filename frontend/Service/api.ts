

import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Config ───────────────────────────────────────────────────────────────────

export const BASE_URL = "http://10.147.130.217:8000/api/v1";

const TOKEN_KEY = "fft_access_token";
const USER_KEY  = "fft_user";

// ─── Token / Session Storage ──────────────────────────────────────────────────

export const TokenStore = {
  save:  (token: string) => AsyncStorage.setItem(TOKEN_KEY, token),
  get:   ()              => AsyncStorage.getItem(TOKEN_KEY),
  clear: ()              => AsyncStorage.removeItem(TOKEN_KEY),
};

export const UserStore = {
  save:  (user: object)  => AsyncStorage.setItem(USER_KEY, JSON.stringify(user)),
  get:   async () => {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  clear: ()              => AsyncStorage.removeItem(USER_KEY),
};

export const clearSession = async () => {
  await TokenStore.clear();
  await UserStore.clear();
};

// ─── Base HTTP Client ─────────────────────────────────────────────────────────

async function http<T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  body?: object,
  requiresAuth = true
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    const token = await TokenStore.get();
    if (!token) throw new Error("Session expired. Please log in again.");
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    // FastAPI returns { detail: "..." } for all errors
    throw new Error(data.detail || `Request failed (${res.status})`);
  }

  return data as T;
}

// ─── Types ────────────────────────────────────────────────────────────────────
// These match the exact shape of your existing mockData objects
// so your screens and components don't need to change.

export interface BudgetLine {
  id: string;
  project_code: string;
  line_item_name: string;
  tcode: string;
  allocated_zmw: number;
  allocated_usd: number;
  spent_zmw: number;
  spent_usd: number;
  remaining_zmw: number;
  remaining_usd: number;
  utilisation_percent: number;
  status: "GREEN" | "ORANGE" | "RED";
}

export interface ExchangeRate {
  month: number;
  year: number;
  zmw_to_usd: number;
  source: string;
}

export interface Transaction {
  id: string;
  local_id: string;
  df_user_id: string;
  df_name: string;
  budget_id: string;
  budget_name: string;
  project_code: string;
  date: string;
  amount_zmw: number;
  amount_usd: number;
  category: "ADMIN" | "ACTIVITY";
  route_type: "FINANCE_ONLY" | "FINANCE_AND_DME";
  transaction_status: "REQUEST_RAISED" | "PAYMENT_PENDING" | "PAID";
  review_status:
    | "PENDING"
    | "FINANCE_APPROVED"
    | "DME_APPROVED"
    | "FULLY_APPROVED"
    | "REJECTED"
    | "NEEDS_CORRECTION";
  description: string;
  document_url: string | null;
  submitted_at: string;
}

export interface AuthUser {
  id: string;
  full_name: string;
  email: string;
  role: "DF" | "FINANCE" | "DME" | "SUPERVISOR" | "SUPER_USER";
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export const authAPI = {
  /**
   * POST /auth/login
   * Stores JWT and user in AsyncStorage.
   * Returns AuthUser so your AuthContext can call setUser().
   */
  login: async (email: string, password: string): Promise<AuthUser> => {
    const data = await http<{ access_token: string; user: AuthUser }>(
      "/auth/login",
      "POST",
      { email, password },
      false // no token needed for login
    );
    await TokenStore.save(data.access_token);
    await UserStore.save(data.user);
    return data.user;
  },

  logout: async () => {
    try {
      await http("/auth/logout", "POST");
    } finally {
      // Always clear local session even if server call fails
      await clearSession();
    }
  },
};

// ─── Budget API ───────────────────────────────────────────────────────────────

export const budgetAPI = {
  /**
   * GET /budgets/my
   * Returns { budget_lines, exchange_rate }.
   * budget_lines matches BUDGET_LINES shape from mockData.
   * exchange_rate matches EXCHANGE_RATE shape from mockData.
   */
  getMyBudgets: (): Promise<{
    budget_lines: BudgetLine[];
    exchange_rate: ExchangeRate;
  }> => http("/budgets/my"),

  /**
   * GET /budgets
   * Same shape as getMyBudgets but all budgets — for Finance/Supervisor.
   */
  getAllBudgets: (): Promise<{
    budget_lines: BudgetLine[];
    exchange_rate: ExchangeRate;
  }> => http("/budgets"),

  /**
   * GET /exchange-rates/current
   * Returns the current month's ZMW/USD rate.
   */
  getCurrentRate: (): Promise<ExchangeRate> =>
    http("/exchange-rates/current"),
};

// ─── Transaction API ──────────────────────────────────────────────────────────

export interface SubmitExpensePayload {
  budget_id: string;
  date: string;           // YYYY-MM-DD
  amount_zmw: number;
  category: "ADMIN" | "ACTIVITY";
  transaction_status: "REQUEST_RAISED" | "PAYMENT_PENDING" | "PAID";
  description: string;
  document_url?: string;
}

export const transactionAPI = {
  /**
   * POST /transactions
   * DF submits a new expense entry.
   * Returns saved transaction with server id, route_type, and confirmation message.
   */
  submit: async (payload: SubmitExpensePayload) => {
    // Generate a local_id on the client for offline deduplication
    const local_id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    return http<Transaction & { route_type: string; message: string }>(
      "/transactions",
      "POST",
      { ...payload, local_id }
    );
  },

  /**
   * GET /transactions/my
   * DF: returns their own submitted transactions.
   * Matches TRANSACTIONS shape from mockData.
   */
  getMy: async (): Promise<Transaction[]> => {
    const res = await http<{ total: number; data: Transaction[] }>("/transactions/my");
    return res.data;
  },

  /**
   * GET /transactions
   * Finance/Supervisor: returns all transactions.
   */
  getAll: async (): Promise<Transaction[]> => {
    const res = await http<{ total: number; data: Transaction[] }>("/transactions");
    return res.data;
  },
};

// ─── Review API ───────────────────────────────────────────────────────────────

export interface ReviewPayload {
  decision: "APPROVED" | "REJECTED" | "NEEDS_CORRECTION";
  comment?: string;
}

export const reviewAPI = {
  /**
   * GET /reviews/pending
   * Finance/DME: returns pending transactions in their review queue.
   */
  getPending: async (): Promise<Transaction[]> => {
    const res = await http<{ total: number; data: Transaction[] }>("/reviews/pending");
    return res.data;
  },

  getAll: async (): Promise<Transaction[]> => {
    const res = await http<{ total: number; data: Transaction[] }>("/reviews");
    return res.data;
  },

  /**
   * POST /reviews/{transactionId}
   * Finance/DME: submit approve / reject / needs_correction decision.
   */
  submitReview: (transactionId: string, payload: ReviewPayload) =>
    http(`/reviews/${transactionId}`, "POST", payload),
};