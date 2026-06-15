// Budget line item type
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
  status: "GREEN" | "ORANGE" | "RED" | string;
}

// Transaction / expense type
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
  category: string;
  route_type: string;
  transaction_status: string;
  review_status:
    | "PENDING"
    | "FINANCE_APPROVED"
    | "FULLY_APPROVED"
    | "NEEDS_CORRECTION"
    | "REJECTED"
    | string;
  description: string;
  document_url: string | null;
  correction_comment?: string;
}

// User type
export interface User {
  id: string;
  full_name: string;
  email: string;
  password: string;
  role: string;
}

// Exchange rate type
export interface ExchangeRate {
  zmw_to_usd: number;
  month: number;
  year: number;
  source: string;
}

// Status badge configuration
export interface StatusConfig {
  label: string;
  bg: string;
  color: string;
}

// Props for StatusBadge component
export interface StatusBadgeProps {
  status: string;
  variant?: "transaction" | "budget";
}

// Props for ProgressBar component
export interface ProgressBarProps {
  percent: number;
  status: string;
  showLabel?: boolean;
  height?: number;
}

// Props for SectionHeader component
export interface SectionHeaderProps {
  title: string;
  linkText?: string;
  onLinkPress?: () => void;
}

// Props for AlertCard component
export interface AlertCardProps {
  type: "warning" | "info";
  title: string;
  message: string;
  actionText?: string;
  onActionPress?: () => void;
  icon?: string;
}

// Props for BudgetCard component
export interface BudgetCardProps {
  line: BudgetLine;
  expanded: boolean;
  onToggle: () => void;
}

// Props for TransactionCard component
export interface TransactionCardProps {
  transaction: Transaction;
  onPress?: () => void;
}

// Props for Header component
export interface HeaderProps {
  greeting: string;
  userName: string;
  roleBadgeText: string;
  showLogout?: boolean;
  onLogout?: () => void;
  rightElement?: React.ReactNode;
}

// Props for ExchangeRateBanner component
export interface ExchangeRateBannerProps {
  rate: ExchangeRate;
}

// Props for FormLabel component
export interface FormLabelProps {
  label: string;
  required?: boolean;
  hint?: string;
}

// Props for FormSelect component
export interface FormSelectProps {
  value?: string | null;
  placeholder: string;
  onPress: () => void;
  icon?: string;
}

// Props for BottomSheet component
export interface BottomSheetOption {
  label: string;
  value: string;
  sub?: string;
}

export interface BottomSheetProps {
  title: string;
  isVisible: boolean;
  options: BottomSheetOption[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

// Props for RouteChip component
export interface RouteChipProps {
  route: "FINANCE_ONLY" | "FINANCE_AND_DME" | string;
}

// Props for SummaryBar component
export interface SummaryBarProps {
  total: number;
  pending: number;
  approved: number;
  needsCorrection: number;
  totalZMW?: number;
}
