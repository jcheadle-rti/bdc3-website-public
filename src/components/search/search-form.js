import React from 'react'
import styled from 'styled-components'
import { Button } from '../buttons'

export const Wrapper = styled.div`
    // border: solid #f99;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
`

export const SearchButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 0;
    padding: 0.5rem 1rem;
`

export const SearchInput = styled.input`
    background-color: #ddd;
    height: 3rem;
    border: 1px solid #ccc;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    overflow: hidden;
    padding: 1rem;
    line-height: 1.5rem;
    letter-spacing: 1px;
    color: #777;
    &::placeholder {
        text-transform: uppercase;
    }
    flex: 1;
    font-weight: bold;
`

export const SearchForm = ({ value, placeholder, changeHandler, keyDownHandler, submitHandler }) => {
    return (
        <Wrapper>
            <SearchInput value={ value } placeholder={ placeholder } onChange={ changeHandler } onKeyDown={ keyDownHandler } />
            <SearchButton onClick={ submitHandler }>SEARCH</SearchButton>
        </Wrapper>
    )
}