import React from 'react'
import styled from 'styled-components'
import { Button } from '../buttons'
import { ChevronLeftIcon, ChevronRightIcon, FirstPageIcon, LastPageIcon } from '../icons'

const Wrapper = styled.nav`
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    ${ Button } {
        margin: 0.5rem 0.25rem;
        padding: 0.5rem 0.75rem;
        width: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export const PaginationTray = ({ currentPage, links, prevPageHandler, nextPageHandler, firstPageHandler, lastPageHandler }) => {
    return (
        <Wrapper role="navigation" aria-label="Pagination Navigation">
            <Button aria-label={ `Go to first page` } light disabled={ firstPageHandler === null } onClick={ firstPageHandler } style={{ padding: 0 }}>
                <FirstPageIcon fill="var(--color-crimson)" size={ 24 } />
            </Button>
            <Button aria-label={ `Go to previous page` } light disabled={ prevPageHandler === null } onClick={ prevPageHandler } style={{ padding: 0 }}>
                <ChevronLeftIcon fill="var(--color-crimson)" size={ 24 } />
            </Button>
            {
                links.map((link, i) => (
                    <Button
                        key={ `page-${ i }` }
                        aria-label={ i === currentPage ? `Page ${ i + 1 }, Current page` : `Go to page ${ i + 1 }` }
                        aria-current={ i === currentPage }
                        light={ i !== currentPage }
                        onClick={ link }
                    >
                        { i + 1 }
                    </Button>
                ))
            }
            <Button aria-label={ `Go to next page` } light disabled={ nextPageHandler === null } onClick={ nextPageHandler } style={{ padding: 0 }}>
                <ChevronRightIcon fill="var(--color-crimson)" size={ 24 } />
            </Button>
            <Button aria-label={ `Go to last page` } light disabled={ lastPageHandler === null } onClick={ lastPageHandler } style={{ padding: 0 }}>
                <LastPageIcon fill="var(--color-crimson)" size={ 24 } />
            </Button>
        </Wrapper>
    )
}
