import React from 'react';

export const Cell = (props) => {
    const style = {
        backgroundColor: 'red',
        width: '150px',
        padding: '2%',
        margin: '2%',
        display: 'inline-block'
    };

    return (
        <div style={style}>
            <div style={{background: '#add8e6'}}>{ props.time }</div>
            <div>{ `${props.temp}°C` }</div>
        </div>
    );
};
