import React, { useEffect, useState } from 'react'
import { PageContent } from '../components/layout'
import { SEO } from '../components/seo'
import { Title, Paragraph } from '../components/typography'
import { PaginationTray, ResultsTable, SearchForm, ResultsCard, ResultsCardHeader, ResultsCardBody, ResultsCardFooter, CardTitle, ResultsCount } from '../components/search'
import { Dots as LoadingDots } from '../components/loading'
import { Alert } from '../components/alert'
import { useSearch } from '../hooks'
import { IconButton } from '../components/buttons'
import { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon } from '../components/icons'

const SearchPage = () => {
    const [query, setQuery] = useState('')
    const [searchedQuery, setSearchedQuery] = useState('')
    const { isLoading, error, results, totalItems, fetchResults } = useSearch()
    const [currentPageNumber, setCurrentPageNumber] = useState(0)
    const [pageCount, setPageCount] = useState()
    const [startingIndex, setStartingIndex] = useState()
    const [endingIndex, setEndingIndex] = useState()

    const perPage = 10

    const goToPage = pageNumber => () => {
        fetchResults(query, pageNumber, perPage)
        setCurrentPageNumber(pageNumber)
    }

    const goToPreviousPage = currentPageNumber > 0 ? goToPage(currentPageNumber - 1) : null
    const goToNextPage = currentPageNumber < pageCount - 1 ? goToPage(currentPageNumber + 1) : null
    const goToFirstPage = currentPageNumber > 0 ? goToPage(0) : null
    const goToLastPage = currentPageNumber < pageCount - 1 ? goToPage(pageCount - 1) : null

    useEffect(() => {
        setPageCount(Math.ceil(totalItems / perPage))
        setStartingIndex(currentPageNumber * perPage)
        setEndingIndex(currentPageNumber * perPage + Math.min(results.length, perPage))
    }, [totalItems, perPage, currentPageNumber, results])
    
    const doSearch = () => {
        // return to first results page on new search
        setCurrentPageNumber(0)
        setSearchedQuery(query)
        fetchResults(query, 0, perPage)
    }

    const handleChangeQuery = event => setQuery(event.target.value)
    const handleSubmit = event => doSearch()
    const handleKeyDown = event => { if (event.keyCode === 13) doSearch() }

    return (
        <PageContent width="95%" maxWidth="1200px" center gutters>
            <SEO
                title="Search"
                description=""
                keywords=""
            />
            
            <Title>Search BioData Catalyst</Title>

            <br/><br/>
 
            <section>
                <SearchForm
                    value={ query }
                    placeholder="Enter query"
                    changeHandler={ handleChangeQuery }
                    submitHandler={ handleSubmit }
                    keyDownHandler={ handleKeyDown }
                />
                
                <br/><br/>

                {
                    searchedQuery && (
                        <ResultsCard>
                            <ResultsCardHeader>
                                { pageCount > 1 && <IconButton disabled={ currentPageNumber === 0 } onClick={ goToFirstPage }><FirstPageIcon fill="#fff" size={ 24 } /></IconButton> }
                                { pageCount > 1 && <IconButton disabled={ currentPageNumber === 0 } onClick={ goToPreviousPage }><ChevronLeftIcon fill="#fff" size={ 24 } /></IconButton> }
                                <CardTitle>{ `${ totalItems } Results for "${ searchedQuery }"` }</CardTitle>
                                { pageCount > 1 && <IconButton disabled={ currentPageNumber === pageCount - 1} onClick={ goToNextPage }><ChevronRightIcon fill="#fff" size={ 24 } /></IconButton> }
                                { pageCount > 1 && <IconButton disabled={ currentPageNumber === pageCount - 1 } onClick={ goToLastPage }><LastPageIcon fill="#fff" size={ 24 } /></IconButton> }
                            </ResultsCardHeader>
                                { error && <Alert type="error" message={ error } /> }
                                { !error && isLoading && <LoadingDots color="var(--color-crimson)" text="Searching..." textPlacement="top" /> }
                                { !error && !isLoading && results.length > 0 && <ResultsTable results={ results } totalItems={ totalItems } perPage={ perPage } currentPageNumber={ currentPageNumber } /> }
                                { !error && !isLoading && results.length === 0 && <ResultsCardBody><Paragraph center>No results to display</Paragraph></ResultsCardBody> }
                            <ResultsCardFooter>
                                { pageCount > 1 && <IconButton disabled={ currentPageNumber === 0 } onClick={ goToFirstPage }><FirstPageIcon fill="#fff" size={ 24 } /></IconButton> }
                                { pageCount > 1 && <IconButton disabled={ currentPageNumber === 0 } onClick={ goToPreviousPage }><ChevronLeftIcon fill="#fff" size={ 24 } /></IconButton> }
                                { results.length > 0 && <ResultsCount>Showing results { startingIndex + 1 } to { endingIndex }</ResultsCount> }
                                { pageCount > 1 && <IconButton disabled={ currentPageNumber === pageCount - 1} onClick={ goToNextPage }><ChevronRightIcon fill="#fff" size={ 24 } /></IconButton> }
                                { pageCount > 1 && <IconButton disabled={ currentPageNumber === pageCount - 1 } onClick={ goToLastPage }><LastPageIcon fill="#fff" size={ 24 } /></IconButton> }
                            </ResultsCardFooter>
                        </ResultsCard>
                    )
                }

                {
                    pageCount > 1 && (
                        <PaginationTray
                            links={ [...Array(pageCount).keys()].map(i => goToPage(i)) }
                            currentPage={ currentPageNumber }
                            prevPageHandler={ currentPageNumber === 0 ? null : goToPreviousPage }
                            nextPageHandler={ currentPageNumber < pageCount - 1 ? goToNextPage : null }
                            firstPageHandler={ currentPageNumber === 0 ? null : goToFirstPage }
                            lastPageHandler={ currentPageNumber < pageCount - 1 ? goToLastPage : null }
                        />
                    )
                }
             </section>
        </PageContent>
    )
}

export default SearchPage