interface ContactData {
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  company?: string | null
  projectType: string
  budget?: string | null
  message: string
  newsletter?: boolean
}

const isConfigured = !!process.env.RESEND_API_KEY

export const emailService = {
  async sendContactNotification(data: ContactData) {
    if (!isConfigured) {
      if (process.env.NODE_ENV === 'development') console.log('[email:stub] contact', data.email)
      return { simulated: true }
    }
    return { sent: true }
  },
  async sendNewsletterConfirmation(email: string, token: string) {
    if (!isConfigured) {
      if (process.env.NODE_ENV === 'development') console.log('[email:stub] newsletter confirmation', email, token)
      return { simulated: true }
    }
    return { sent: true }
  },
  async sendNewsletterWelcome(email: string) {
    if (!isConfigured) {
      if (process.env.NODE_ENV === 'development') console.log('[email:stub] newsletter welcome', email)
      return { simulated: true }
    }
    return { sent: true }
  },
}
