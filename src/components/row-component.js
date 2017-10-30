import React from 'react';
import moment from 'moment';

import { Cell } from './cell-component';

export const Row = (props) => {
    const cells = props.chunks.map((chunk, i) => {
        return (<Cell key={i} { ...chunk }/>)
    });

    const day = moment(props.date).format('dddd');
    
    return (
        <div style={{ width: props.width }}>
            <h1>{ day }</h1>
            <div style={{overflow:'auto', whiteSpace: 'nowrap'}}>
                { cells }
            </div>
        </div>
    );
}
