import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Table } from './table-component';
import { Row } from './row-component';

const props = {
    data: [
        'mockData',
        'mockData',
        'mockData',
        'mockData'
    ]
};

describe('<Table />', () => {
    it('should render a <Row /> for each item in data array', () => {
        const wrapper = shallow(<Table {...props}/>);
        
        expect(wrapper.find(Row)).to.have.length(4);
    });
});