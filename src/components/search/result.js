import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ExternalLink } from '../link'
import { useWindowWidth } from '../../hooks'
import { Paragraph, Subheading } from '../typography'

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

// Name

const Name = styled(Subheading)`
    padding: 0;
    margin: 1rem 0 0 0.5rem;
`
// Details

const Description = styled(Paragraph)`
    margin: 1rem 0 1rem 0.5rem;
`


const Detail = styled.span`
`

// Meta details

const Meta = styled.div`
    background-color: #eee;
    padding: 0.5rem;
    font-size: 90%;
    display: flex;
    flex-direction: ${ props => props.compact ? 'column' : 'row' };
    justify-content: ${ props => props.compact ? 'flex-start' : 'space-between' };
    align-items: ${ props => props.compact ? 'flex-start' : 'center' };
    ${ Detail } {
        flex: 1;
        padding: 0 0.25rem;
    }
`

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

export const Result = ({ index, name, variable, study, studyId, description, instructions }) => {
    const { isCompact } = useWindowWidth()

    return (
        <Wrapper compact={ isCompact }>
            <Name><strong>{ index }.</strong> { name }</Name>
            <Description>
                { description }
            </Description>
            <Meta compact={ isCompact }>
                <Detail>Variable: <ExternalLink to={ dbGapLink(variable, study) || null }>{ variable }</ExternalLink></Detail>
                <Detail>Study: { study }</Detail>
                <Detail>ID: { studyId }</Detail>
            </Meta>
        </Wrapper>
    )
}

Result.propTypes = {
    name: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired,
    study: PropTypes.string.isRequired,
}

// New shape of results
// "hits": {
//   "hits": [
//     {
//       "_type": "_doc",
//       "_id": "GO:0030431",
//       "_source": {
//         "study_name": "Cardiovascular Health Study (CHS)",
//         "description": "Quantitative measure of Apnea-Hypopnea Index (AHI), a measure of sleep apnea severity",
//         "instructions": "Include variables that represent an AHI measurement. Include variables from all time points and all repeated measures within each time point, e.g. AHI measured at multiple exams. Include all instances of duplicated variables, e.g. AHI variables included in multiple datasets. Include variables in all measurement units available, e.g. AHI in events per hour or in events per day. Include both corrected/adjusted and uncorrected/unadjusted measures. Include variables that represent subtypes of AHI, e.g. obstructive apnea hypopnea index (OAHI), obstructive apnea index (OAI), central apnea index (CAI), etc. Do not include component variables, e.g. variables representing the total number of hypopneas or apneas during sleep. If the respiratory disturbance index (RDI) was defined in the same way as AHI, then you may include RDI variables. Do not include RDI variables if they include respiratory effort related arousals (RERAs).",
//         "id": "GO:0030431",
//         "name": "sleep",
//         "study": "phs000287.v6.p1",
//         "tag": "68",
//         "var": "phv00197745.v1.p1"
//       }
//     },
//   ]
// }