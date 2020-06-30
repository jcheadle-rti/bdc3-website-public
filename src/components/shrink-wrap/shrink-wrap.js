import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    height: ${ props => props.currentHeight }px;
    min-height: ${ props => props.currentHeight }px;
    max-height: ${ props => props.currentHeight }px;
    transition: min-height 500ms, max-height 1000ms;
`

export const ShrinkWrap = ({ children }) => {
    const innerRef = useRef()
    const [innerHeight, setInnerHeight] = useState(0)

    useEffect(() => {
        if (innerRef.current) {
            setInnerHeight(innerRef.current.scrollHeight)
        }
    }, [children, innerRef])

    return (
        <Wrapper currentHeight={ innerHeight }>
            <div ref={ innerRef }>
                { children }
            </div>
        </Wrapper>
    )
}