import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Row } from './row-component';
import { Cell } from './cell-component';

const props = {
    date: '1992-07-12',
    chunks: [
        'mockChunk1',
        'mockChunk2',
        'mockChunk3'
    ]
};

describe('<Row />', () => {
    it('should render a <Cell /> for every chunk in chunk array and display day of week', () => {
        const wrapper = shallow(<Row {...props}/>);
        
        expect(wrapper.find(Cell)).to.have.length(3);

        expect(wrapper.find('h1')).to.have.length(1);
        expect(wrapper.find('h1').text()).to.equal('Sunday');
    });
});