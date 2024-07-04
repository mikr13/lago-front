import { AvailableFilters } from './types'

interface FiltersPanelProps {
  filters: AvailableFilters[]
}

export const FiltersPanel = ({ filters, ...props }: FiltersPanelProps) => {
  return (
    <>
      Display trigger button that should open the popper also, next to it should be displayed the
      active filters And after that the clear all filters button
    </>
  )
}
