import React from 'react';
import './Background.css';

export default function Background(props) {

    let layers = [
        'primary',
        'secondary',
        'tertiary',
    ];

    return (
        <div className="background-container">
            <div className="background-layer main-display"></div>
            {
                layers.map( layer => {
                    let className = `background-layer dots-${layer}`;
                    if (props.activeLayers.includes(layer)) {
                        className += ' active';
                    }
                    return (
                        <div className={className}></div>
                    )
                })
            }
        </div>
    )
}