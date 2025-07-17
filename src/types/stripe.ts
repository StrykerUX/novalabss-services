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