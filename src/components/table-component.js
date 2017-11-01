import React from 'react';
import { Row } from './row-component';

export const Table = (props) => {
    let rows = [];
    props.data.forEach((rowData, i) => {
        rows.push(<Row key={i} width={'80vw'} { ...rowData } />);
    });
    
    return (
        <div>
            { rows }
        </div>
    );
}
