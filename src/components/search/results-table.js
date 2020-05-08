import React from 'react'
import { Result } from './result'

export const ResultsTable = ({ results, totalItems, currentPageNumber, perPage, getNextPage, getPreviousPage }) => {
    return results.map(({ _source }, i) => (
        <Result
            key={ `${ _source._id }-${ i }` }
            index={ perPage * currentPageNumber + i + 1 }
            study={ _source.study }
            name={ _source.name[0] || 'N/A' }
            variable={ _source.var || 'N/A' }
        />
    ))
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