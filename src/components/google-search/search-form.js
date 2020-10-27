import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { SearchContext } from './search-context'

const Wrapper = styled.div``

export const SearchForm = () => {
  const { query, handleChangeQuery, doSearch } = useContext(SearchContext)

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      doSearch()
    }
  }

  return (
    <Wrapper>
      <input type="text" value={ query } onChange={ handleChangeQuery } onKeyDown={ handleKeyDown } />
      <button onClick={ doSearch }>Search</button>
    </Wrapper>
  )
}