import styled from 'styled-components'

export const IconButton = styled.button`
    background-color: transparent;
    border: 0;
    padding: 0.5rem;
    cursor: pointer;
    padding: 1rem;
    cursor: ${ props => props.disabled ? 'default' : 'pointer' };;
    opacity: ${ props => props.disabled ? '0.5' : '1.0' };
    display: flex;
    justify-content: center;
    align-items: center;
    transition: filter 250ms;
    &:hover, &:focus {
        filter: brightness(1.2);
    }
    &:active {
        filter: brightness(0.5);
    }
`
