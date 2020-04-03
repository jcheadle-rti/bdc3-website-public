import styled from 'styled-components'

export const SearchInput = styled.input`
    background-color: #ddd;
    height: 3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    padding: 1rem;
    line-height: 1.5rem;
    letter-spacing: 1px;
    color: #777;
    &::placeholder {
        text-transform: uppercase;
    }
    font-weight: bold;
`
