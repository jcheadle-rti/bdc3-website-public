import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ExternalLink } from '../link'
import { useWindowWidth } from '../../hooks'
import { Subheading } from '../typography'

const DB_GAP_URL = `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/variable.cgi`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    padding: 1rem;
    &:not(:last-child) {
        border-bottom: 1px solid var(--color-eggplant-light);
    }
`

const Details = styled.div`
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    justify-content: ${ props => props.compact ? 'flex-start' : 'space-between' };
    align-items: ${ props => props.compact ? 'flex-start' : 'center' };
`

const Detail = styled.div`
    flex: 1;
    padding: 0.5rem;
`

const Name = styled(Subheading)`
    padding: 0 0.5rem;
`
const Variable = styled(Detail)``
const Study = styled(Detail)``

const dbGapLink = (variable, study) => {
    // variable always has the form "phv987654321.v12.p23"
    // and the "987654321" portion is used in the dbGap link
    const matches = variable.match(/^phv(\d+)\.v\d+\.p\d+$/)
    if (matches) {
        const [, variableDigits] = variable.match(/^phv(\d+)\.v\d+\.p\d+$/)
        return variableDigits ? `${ DB_GAP_URL }?study_id=${ study }&phv=${ variableDigits }` : `${ DB_GAP_URL }?study_id=${ study }&phv=${ variable }`
    } else {
        return null
    }
}

export const Result = ({ index, name, variable, study }) => {
    const { isCompact } = useWindowWidth()

    return (
        <Wrapper compact={ isCompact }>
            <Name><strong>{ index }.</strong> { name }</Name>
            <Details compact={ isCompact }>
                <Variable>Variable: <ExternalLink to={ dbGapLink(variable, study) || null }>{ variable }</ExternalLink></Variable>
                <Study>Study: { study }</Study>
            </Details>
        </Wrapper>
    )
}

Result.propTypes = {
    name: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired,
    study: PropTypes.string.isRequired,
}
