import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import WrappedApp from './app-container';
import { Table } from '../components/table-component';

const App = WrappedApp.WrappedComponent;
let props;

describe('<App /> Container', () => {
    beforeEach(() => {
        props = {
            loading: true,
            getWeatherData: sinon.spy()
        };
    });

    it('should show \'Loading\' before data is fetched', () => {
        const wrapper = shallow(<App {...props} />);
        const instance = wrapper.instance();

        expect(instance.state).to.deep.equal({ dataSource: 'openweather' });
        expect(wrapper.find('h1').text()).to.be.equal('Loading');
    });

    it('should dispatch action for openweather on mount', () => {
        const wrapper = shallow(<App {...props} />);
        expect(props.getWeatherData).to.have.been.calledWith('openweather').calledOnce;
    });

    it('should render buttons and table when data is loaded', () => {
        const wrapper = shallow(<App {...props} />);
        const instance = wrapper.instance();

        wrapper.setProps({ loading: false, data: 'mockedData' });

        expect(wrapper.find('button')).to.have.length(2);
        expect(wrapper.find(Table)).to.have.length(1);
        expect(wrapper.find(Table).prop('data')).to.be.equal('mockedData');
    })

    it('should fire another action when another data source is selected', () => {
        const wrapper = shallow(<App {...props} />);
        const instance = wrapper.instance();
        expect(instance.state).to.deep.equal({ dataSource: 'openweather' });

        wrapper.setProps({ loading: false, data: 'mockedData' });
        expect(props.getWeatherData).to.have.been.calledOnce.calledWith('openweather');

        wrapper.find('button.csv').simulate('click');
        expect(props.getWeatherData).to.have.been.calledTwice.calledWith('csv');
    });

    it('should not fire another action when the same data source is selected', () => {
        const wrapper = shallow(<App {...props} />);
        const instance = wrapper.instance();
        expect(instance.state).to.deep.equal({ dataSource: 'openweather' });

        wrapper.setProps({ loading: false, data: 'mockedData' });
        expect(props.getWeatherData).to.have.been.calledOnce.calledWith('openweather');

        wrapper.find('button.openweather').simulate('click');
        expect(props.getWeatherData).to.have.been.calledOnce.calledWith('openweather');
    });
});