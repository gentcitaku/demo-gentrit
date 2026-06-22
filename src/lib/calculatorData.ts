import {
  TrendingUp,
  DollarSign,
  PieChart,
  Calculator,
  Home,
  Percent,
  BarChart3,
  LineChart,
  Target,
  Briefcase,
  Zap,
  RefreshCw,
  LucideIcon,
} from 'lucide-react'

export interface Calculator {
  id: string
  slug: string
  name: string
  description: string
  category: 'Loans' | 'Investments' | 'Planning' | 'Tax' | 'Comparison'
  icon: LucideIcon
  color: string
}

export const calculators: Calculator[] = [
  {
    id: 'emi',
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    description: 'Calculate monthly EMI for loans and mortgages',
    category: 'Loans',
    icon: DollarSign,
    color: 'from-emerald-500 to-green-600',
  },
  {
    id: 'compound',
    slug: 'compound-interest',
    name: 'Compound Interest',
    description: 'Calculate compound interest and investment growth',
    category: 'Investments',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'sip',
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    description: 'Plan systematic investment programs',
    category: 'Investments',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-600',
  },
  {
    id: 'loan-eligibility',
    slug: 'loan-eligibility',
    name: 'Loan Eligibility',
    description: 'Check your loan eligibility based on income',
    category: 'Loans',
    icon: Calculator,
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'interest-rate',
    slug: 'interest-rate-calculator',
    name: 'Interest Rate Calculator',
    description: 'Calculate simple and complex interest rates',
    category: 'Loans',
    icon: Percent,
    color: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'loan-comparison',
    slug: 'loan-comparison',
    name: 'Loan Comparison',
    description: 'Compare multiple loan offers side by side',
    category: 'Comparison',
    icon: LineChart,
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'inflation',
    slug: 'inflation-calculator',
    name: 'Inflation Calculator',
    description: 'Calculate inflation impact on purchasing power',
    category: 'Planning',
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'retirement',
    slug: 'retirement-calculator',
    name: 'Retirement Planning',
    description: 'Plan and calculate retirement savings needs',
    category: 'Planning',
    icon: Target,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'net-worth',
    slug: 'net-worth-calculator',
    name: 'Net Worth Calculator',
    description: 'Calculate your total net worth and assets',
    category: 'Planning',
    icon: PieChart,
    color: 'from-lime-500 to-green-600',
  },
  {
    id: 'debt-payoff',
    slug: 'debt-payoff-calculator',
    name: 'Debt Payoff',
    description: 'Plan your debt payoff strategy and timeline',
    category: 'Planning',
    icon: Zap,
    color: 'from-red-500 to-orange-600',
  },
  {
    id: 'income-tax',
    slug: 'income-tax-calculator',
    name: 'Income Tax Calculator',
    description: 'Calculate income tax and tax liability (India)',
    category: 'Tax',
    icon: Calculator,
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'gst',
    slug: 'gst-calculator',
    name: 'GST Calculator',
    description: 'Calculate GST and price conversions',
    category: 'Tax',
    icon: Percent,
    color: 'from-sky-500 to-cyan-600',
  },
  {
    id: 'fd',
    slug: 'fd-calculator',
    name: 'FD Calculator',
    description: 'Calculate fixed deposit maturity amount',
    category: 'Investments',
    icon: DollarSign,
    color: 'from-teal-500 to-green-600',
  },
  {
    id: 'rd',
    slug: 'rd-calculator',
    name: 'RD Calculator',
    description: 'Calculate recurring deposit maturity amount',
    category: 'Investments',
    icon: RefreshCw,
    color: 'from-fuchsia-500 to-pink-600',
  },
  {
    id: 'crorepati',
    slug: 'crorepati-calculator',
    name: 'Crorepati Goal',
    description: 'Plan to achieve 1 crore wealth target',
    category: 'Planning',
    icon: Target,
    color: 'from-yellow-500 to-amber-600',
  },
  {
    id: 'salary-planner',
    slug: 'salary-savings-planner',
    name: 'Salary Savings Planner',
    description: 'Plan savings from your salary',
    category: 'Planning',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-600',
  },
  {
    id: 'buy-rent',
    slug: 'buy-vs-rent',
    name: 'Buy vs Rent',
    description: 'Compare buying and renting options',
    category: 'Comparison',
    icon: Home,
    color: 'from-orange-500 to-yellow-600',
  },
  {
    id: 'freelancer',
    slug: 'freelancer-income',
    name: 'Freelancer Income',
    description: 'Manage and calculate freelance income',
    category: 'Planning',
    icon: TrendingUp,
    color: 'from-pink-500 to-rose-600',
  },
]

export const getCalculatorBySlug = (slug: string): Calculator | undefined => {
  return calculators.find(calc => calc.slug === slug)
}

export const getCalculatorsByCategory = (category: string): Calculator[] => {
  return calculators.filter(calc => calc.category === category)
}

export const categories = Array.from(new Set(calculators.map(c => c.category)))
