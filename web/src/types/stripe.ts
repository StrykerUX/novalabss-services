export interface StripeSubscription {
  id: string
  status: 'active' | 'past_due' | 'canceled' | 'incomplete' | 'trialing' | 'unpaid'
  current_period_start: number
  current_period_end: number
  cancel_at_period_end: boolean
  created: number
  plan: {
    id: string
    amount: number
    currency: string
    interval: string
    interval_count: number
    product: string
  }
  customer: string
}

export interface StripePlan {
  id: 'rocket' | 'galaxy'
  name: string
  productId: string
  price: number
  currency: string
  interval: string
  interval_count: number
  features: string[]
  description: string
  credits: number
}

export interface SubscriptionData {
  subscription: StripeSubscription | null
  plan: StripePlan | null
  isActive: boolean
  status: string
  startDate: Date | null
  endDate: Date | null
  daysElapsed: number
  daysRemaining: number
  renewalDate: Date | null
  loading: boolean
  error: string | null
}

export interface CustomerData {
  id: string
  email: string
  name?: string
  created: number
  subscriptions: StripeSubscription[]
}

export interface StripeInvoice {
  id: string
  number: string | null
  status: 'draft' | 'open' | 'paid' | 'uncollectible' | 'void'
  amount_paid: number
  amount_due: number
  currency: string
  created: number
  period_start: number | null
  period_end: number | null
  hosted_invoice_url: string | null
  invoice_pdf: string | null
  paid: boolean
  attempt_count: number
  billing_reason: string | null
  description: string | null
  subscription_id: string | null
  lines: InvoiceLine[]
}

export interface InvoiceLine {
  id: string
  amount: number
  currency: string
  description: string | null
  period: {
    start: number
    end: number
  }
  price: {
    id: string
    unit_amount: number | null
    currency: string
    recurring: {
      interval: string
      interval_count: number
    } | null
  } | null
}

export interface InvoicesResponse {
  invoices: StripeInvoice[]
  has_more: boolean
  total_count: number
  message?: string
}