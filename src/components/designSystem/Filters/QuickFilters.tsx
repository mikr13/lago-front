import styled, { css } from 'styled-components'

import { theme } from '~/styles'

import { InvoiceStatusQuickFilter } from './InvoiceStatusQuickFilter'
import { AvailableQuickFilters } from './types'

interface QuickFiltersProps {
  type: AvailableQuickFilters
  borderBottom?: boolean
}

export const QuickFilters = ({ borderBottom, type, ...props }: QuickFiltersProps) => {
  return (
    <QuickFiltersContainer $borderBottom={borderBottom} {...props}>
      {type === AvailableQuickFilters.InvoiceStatus ? <InvoiceStatusQuickFilter /> : null}
    </QuickFiltersContainer>
  )
}

const QuickFiltersContainer = styled.div<{ $borderBottom?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${theme.spacing(4)} ${theme.spacing(12)};
  box-sizing: border-box;
  gap: ${theme.spacing(3)};
  overflow-y: scroll;

  ${({ $borderBottom }) =>
    $borderBottom &&
    css`
      box-shadow: ${theme.shadows[7]};
    `}

  ${theme.breakpoints.down('md')} {
    padding: ${theme.spacing(4)};
  }
`
