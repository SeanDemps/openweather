import React from 'react';
import { connect } from 'react-redux';
import { getWeatherData } from './app-redux';

import { Table } from '../components/table-component';
import { DATA_SOURCES } from '../constants/data-sources';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: DATA_SOURCES.OPEN_WEATHER };
    }

    componentWillMount() {
        this.getWeatherData(this.state.dataSource);        
    }
    
    componentWillUpdate(nextProps, nextState) {
        if (nextState.dataSource !== this.state.dataSource) {
            this.getWeatherData(nextState.dataSource);
        }
    }

    getWeatherData(dataSource) {
        this.props.getWeatherData(dataSource);
    }

    updateData(dataSource) {
        return () => this.setState({ dataSource });
    }

    renderButtons() {
        return(
            <div>
                <button className={DATA_SOURCES.OPEN_WEATHER} onClick={this.updateData(DATA_SOURCES.OPEN_WEATHER)}>{DATA_SOURCES.OPEN_WEATHER}</button>
                <button className={DATA_SOURCES.CSV} onClick={this.updateData(DATA_SOURCES.CSV)}>{DATA_SOURCES.CSV}</button>
            </div>
        )
    }

    render() {
        if(this.props.loading) {
            return <h1>Loading</h1>
        }
        return (
            <div>
                {this.renderButtons()}
                <Table data={this.props.data} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
    loading: state.loading,
    error: state.error
});

export default connect(
    mapStateToProps,
    { getWeatherData }
)(App)
