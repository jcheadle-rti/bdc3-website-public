import styled from 'styled-components'

export const Button = styled.button`
    background-color: ${ props => props.light ? '#fff' : 'var(--color-crimson)' };
    border-radius: 4px;
    display: inline-block;
    border: ${ props => props.light ? '1px solid var(--color-crimson)' : '0' };
    color: ${ props => props.light ? 'var(--color-crimson) !important' : '#fff' };
    padding: ${ props => props.small ? '0.25rem' : '1rem 1.5rem' };
    text-transform: uppercase;
    text-decoration: none !important;
    white-space: nowrap;
    cursor: pointer;
    ${ props => props.fullWidth ? `width: 100%;` : undefined }
    position: relative;
    transition: filter 250ms;
    &:hover, &:focus {
        filter: brightness(1.2);
    }
`
