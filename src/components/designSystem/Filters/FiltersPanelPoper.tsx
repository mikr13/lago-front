import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useInternationalization } from '~/hooks/core/useInternationalization'
import { theme } from '~/styles'

import { AvailableFilters } from './types'

import { Button } from '../Button'
import { Popper } from '../Popper'
import { Typography } from '../Typography'

interface FiltersPanelPoperProps {
  filters: AvailableFilters[]
}

export const FiltersPanelPoper = ({ filters, ...props }: FiltersPanelPoperProps) => {
  const navigate = useNavigate()
  const { translate } = useInternationalization()

  return (
    <Popper
      PopperProps={{ placement: 'bottom-end' }}
      opener={
        <Button startIcon="filter" variant="quaternary">
          {translate('TODO: Filters')}
        </Button>
      }
    >
      {({ closePopper }) => (
        <FiltersContainer>
          <FiltersHeader>
            <Typography variant="body" color="grey700">
              {translate('TODO: Filters')}
            </Typography>

            <Button onClick={() => navigate({ search: undefined })} variant="quaternary">
              {translate('TODO: Clear all')}
            </Button>
          </FiltersHeader>
          <FiltersBody></FiltersBody>
          <FiltersFooter></FiltersFooter>
        </FiltersContainer>
      )}
    </Popper>
  )
}

const FiltersContainer = styled.div`
  display: grid;
  grid-template-rows: 64px 1fr 72px;

  ${theme.breakpoints.up('md')} {
    max-height: 480px;
  }
`

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing(3)} ${theme.spacing(6)};
  box-sizing: border-box;
`

const FiltersBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(6)};
  box-sizing: border-box;
`

const FiltersFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing(4)} ${theme.spacing(6)};
  box-sizing: border-box;
`
