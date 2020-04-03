import React from 'react'
import { Result } from './result'

export const ResultsTable = ({ results, totalItems, currentPageNumber, perPage, getNextPage, getPreviousPage }) => {
    return results.map(({ _source }, i) => (
        <Result key={ `${ _source._id }-${ i }` } index={ perPage * currentPageNumber + i + 1 } name={ _source.name[0] || 'N/A' } variable={ _source.var || 'N/A' } study={ _source.study } />
    ))
}
