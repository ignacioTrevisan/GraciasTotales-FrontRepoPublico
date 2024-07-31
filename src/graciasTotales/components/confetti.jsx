import React from 'react'
import ReactConfetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'



export const Confetti = () => {
    const { width, height } = useWindowSize()

    return (
        <ReactConfetti
            width={width}
            height={height}
        />
    )
}
