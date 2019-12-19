import React from 'react';
import './Scores.css';

export default function ScoreDigit({value}) {
    return (
        <div className="score-digit-container">
            <div className="score-digit dimmed"><span className="digit-value">8</span></div>
            <div className="score-digit"><span data-digit-value={value} className="digit-value">{value}</span></div>
        </div>
    )
}