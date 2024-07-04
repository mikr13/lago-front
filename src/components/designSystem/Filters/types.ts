export enum AvailableQuickFilters {
  InvoiceStatus = 'invoiceStatus',
}
export type AvailableFilters =
  | 'status'
  | 'invoiceType'
  | 'paymentStatus'
  | 'currency'
  | 'issuingDate'
  | 'customer'
  | 'dispute'
  | 'overdue'
