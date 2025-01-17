// Note: some test have to transform URLSearchParams to Map to make it work.
// Seems Jest does not support some URLSearchParams methods directly like size.
import {
  buildDraftUrlParams,
  buildOutstandingUrlParams,
  buildPaymentDisputeLostUrlParams,
  buildPaymentOverdueUrlParams,
  buildSucceededUrlParams,
  buildVoidedUrlParams,
  formatFiltersForInvoiceQuery,
  isDraftUrlParams,
  isOutstandingUrlParams,
  isPaymentDisputeLostUrlParams,
  isPaymentOverdueUrlParams,
  isSucceededUrlParams,
  isVoidedUrlParams,
} from '../utils'

describe('Filters utils', () => {
  describe('formatFiltersForInvoiceQuery', () => {
    it('should format filters for invoice query', () => {
      const searchParams = new URLSearchParams()

      searchParams.set('paymentStatus', 'failed,pending')
      searchParams.set('status', 'finalized')
      searchParams.set('paymentOverdue', 'true')

      const result = formatFiltersForInvoiceQuery(searchParams)

      expect(result).toEqual({
        paymentStatus: ['failed', 'pending'],
        status: 'finalized',
        paymentOverdue: true,
      })
    })

    it('should return empty object when filters are not valid', () => {
      const searchParams = new URLSearchParams()

      searchParams.set('invalidFilter', 'value')

      const result = formatFiltersForInvoiceQuery(searchParams)

      expect(result).toEqual({})
    })
  })

  describe('outstanding', () => {
    it('should return true when search params are valid', () => {
      const searchParams = new Map(new URLSearchParams(buildOutstandingUrlParams()).entries())

      expect(isOutstandingUrlParams(searchParams as unknown as URLSearchParams)).toBe(true)
    })

    it('should return false when search params are not valid', () => {
      const succeededSearchParams = new Map(
        new URLSearchParams(buildSucceededUrlParams()).entries(),
      )
      const draftSearchParams = new Map(new URLSearchParams(buildDraftUrlParams()).entries())
      const paymentOverdueSearchParams = new Map(
        new URLSearchParams(buildPaymentOverdueUrlParams()).entries(),
      )
      const voidedSearchParams = new Map(new URLSearchParams(buildVoidedUrlParams()).entries())
      const paymentDisputeLostSearchParams = new Map(
        new URLSearchParams(buildPaymentDisputeLostUrlParams()).entries(),
      )

      expect(isOutstandingUrlParams(succeededSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(isOutstandingUrlParams(draftSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isOutstandingUrlParams(paymentOverdueSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(isOutstandingUrlParams(voidedSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(
        isOutstandingUrlParams(paymentDisputeLostSearchParams as unknown as URLSearchParams),
      ).toBe(false)
    })
  })

  describe('succeeded', () => {
    it('should return true when search params are valid', () => {
      const searchParams = new Map(new URLSearchParams(buildSucceededUrlParams()).entries())

      expect(isSucceededUrlParams(searchParams as unknown as URLSearchParams)).toBe(true)
    })

    it('should return false when search params are not valid', () => {
      const outstandingSearchParams = new Map(
        new URLSearchParams(buildOutstandingUrlParams()).entries(),
      )
      const draftSearchParams = new Map(new URLSearchParams(buildDraftUrlParams()).entries())
      const paymentOverdueSearchParams = new Map(
        new URLSearchParams(buildPaymentOverdueUrlParams()).entries(),
      )
      const voidedSearchParams = new Map(new URLSearchParams(buildVoidedUrlParams()).entries())
      const paymentDisputeLostSearchParams = new Map(
        new URLSearchParams(buildPaymentDisputeLostUrlParams()).entries(),
      )

      expect(isSucceededUrlParams(outstandingSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(isSucceededUrlParams(draftSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isSucceededUrlParams(paymentOverdueSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(isSucceededUrlParams(voidedSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(
        isSucceededUrlParams(paymentDisputeLostSearchParams as unknown as URLSearchParams),
      ).toBe(false)
    })
  })

  describe('draft', () => {
    it('should return true when search params are valid', () => {
      const searchParams = new Map(new URLSearchParams(buildDraftUrlParams()).entries())

      expect(isDraftUrlParams(searchParams as unknown as URLSearchParams)).toBe(true)
    })

    it('should return false when search params are not valid', () => {
      const outstandingSearchParams = new Map(
        new URLSearchParams(buildOutstandingUrlParams()).entries(),
      )
      const succeededSearchParams = new Map(
        new URLSearchParams(buildSucceededUrlParams()).entries(),
      )
      const paymentOverdueSearchParams = new Map(
        new URLSearchParams(buildPaymentOverdueUrlParams()).entries(),
      )
      const voidedSearchParams = new Map(new URLSearchParams(buildVoidedUrlParams()).entries())
      const paymentDisputeLostSearchParams = new Map(
        new URLSearchParams(buildPaymentDisputeLostUrlParams()).entries(),
      )

      expect(isDraftUrlParams(outstandingSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isDraftUrlParams(succeededSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isDraftUrlParams(paymentOverdueSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isDraftUrlParams(voidedSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isDraftUrlParams(paymentDisputeLostSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
    })
  })

  describe('paymentOverdue', () => {
    it('should return true when search params are valid', () => {
      const searchParams = new Map(new URLSearchParams(buildPaymentOverdueUrlParams()).entries())

      expect(isPaymentOverdueUrlParams(searchParams as unknown as URLSearchParams)).toBe(true)
    })

    it('should return false when search params are not valid', () => {
      const outstandingSearchParams = new Map(
        new URLSearchParams(buildOutstandingUrlParams()).entries(),
      )
      const succeededSearchParams = new Map(
        new URLSearchParams(buildSucceededUrlParams()).entries(),
      )
      const draftSearchParams = new Map(new URLSearchParams(buildDraftUrlParams()).entries())
      const voidedSearchParams = new Map(new URLSearchParams(buildVoidedUrlParams()).entries())
      const paymentDisputeLostSearchParams = new Map(
        new URLSearchParams(buildPaymentDisputeLostUrlParams()).entries(),
      )

      expect(isPaymentOverdueUrlParams(outstandingSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(isPaymentOverdueUrlParams(succeededSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(isPaymentOverdueUrlParams(draftSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isPaymentOverdueUrlParams(voidedSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(
        isPaymentOverdueUrlParams(paymentDisputeLostSearchParams as unknown as URLSearchParams),
      ).toBe(false)
    })
  })

  describe('voided', () => {
    it('should return true when search params are valid', () => {
      const searchParams = new Map(new URLSearchParams(buildVoidedUrlParams()).entries())

      expect(isVoidedUrlParams(searchParams as unknown as URLSearchParams)).toBe(true)
    })

    it('should return false when search params are not valid', () => {
      const outstandingSearchParams = new Map(
        new URLSearchParams(buildOutstandingUrlParams()).entries(),
      )
      const succeededSearchParams = new Map(
        new URLSearchParams(buildSucceededUrlParams()).entries(),
      )
      const draftSearchParams = new Map(new URLSearchParams(buildDraftUrlParams()).entries())
      const paymentOverdueSearchParams = new Map(
        new URLSearchParams(buildPaymentOverdueUrlParams()).entries(),
      )
      const paymentDisputeLostSearchParams = new Map(
        new URLSearchParams(buildPaymentDisputeLostUrlParams()).entries(),
      )

      expect(isVoidedUrlParams(outstandingSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isVoidedUrlParams(succeededSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isVoidedUrlParams(draftSearchParams as unknown as URLSearchParams)).toBe(false)
      expect(isVoidedUrlParams(paymentOverdueSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(isVoidedUrlParams(paymentDisputeLostSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
    })
  })

  describe('paymentDisputeLost', () => {
    it('should return true when search params are valid', () => {
      const searchParams = new Map(
        new URLSearchParams(buildPaymentDisputeLostUrlParams()).entries(),
      )

      expect(isPaymentDisputeLostUrlParams(searchParams as unknown as URLSearchParams)).toBe(true)
    })

    it('should return false when search params are not valid', () => {
      const outstandingSearchParams = new Map(
        new URLSearchParams(buildOutstandingUrlParams()).entries(),
      )
      const succeededSearchParams = new Map(
        new URLSearchParams(buildSucceededUrlParams()).entries(),
      )
      const draftSearchParams = new Map(new URLSearchParams(buildDraftUrlParams()).entries())
      const paymentOverdueSearchParams = new Map(
        new URLSearchParams(buildPaymentOverdueUrlParams()).entries(),
      )
      const voidedSearchParams = new Map(new URLSearchParams(buildVoidedUrlParams()).entries())

      expect(
        isPaymentDisputeLostUrlParams(outstandingSearchParams as unknown as URLSearchParams),
      ).toBe(false)
      expect(
        isPaymentDisputeLostUrlParams(succeededSearchParams as unknown as URLSearchParams),
      ).toBe(false)
      expect(isPaymentDisputeLostUrlParams(draftSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
      expect(
        isPaymentDisputeLostUrlParams(paymentOverdueSearchParams as unknown as URLSearchParams),
      ).toBe(false)
      expect(isPaymentDisputeLostUrlParams(voidedSearchParams as unknown as URLSearchParams)).toBe(
        false,
      )
    })
  })
})
