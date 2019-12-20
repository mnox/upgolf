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
            <div key="00" className="background-layer main-display"></div>
            {
                layers.map( (layer, index) => {
                    let className = `background-layer dots-${layer}`;
                    if (props.activeLayers.includes(layer)) {
                        className += ' active';
                    }
                    return (
                        <div key={index} className={className}></div>
                    )
                })
            }
        </div>
    )
}