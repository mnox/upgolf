import React from 'react';
import ScoreDigit from './ScoreDigit';

export default function Score(props) {
    let digits = props.value.toString().split('').map(Number);
    while(digits.length < props.length) {
        digits.unshift(null);
    }
    return (
        <div className={`score-container ${props.extraClass}`}>

            {
                digits.map( (digit, index) => {
                    return(
                        <ScoreDigit key={index} value={digit}/>
                    )
                })
            }

        </div>
    )
}