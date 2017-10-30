import React from 'react';

import { Table } from '../components/table-component';
import weather from '../services/weatherService'; // use dependency injection for this?
import { DATA_SOURCES } from '../constants/data-sources';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dataSource: DATA_SOURCES.OPEN_WEATHER, loading: true, data: null };
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
        // this.setState({ loading: true }); -- should really be used, but causes flashing as CSV loads too fast
        weather.getData(dataSource)
        .then(data => {
            this.setState({ data, loading: false });
        });
    }

    updateData(dataSource) {
        return () => this.setState({ dataSource });
    }

    renderButtons() {
        return(
            <div>
                <button onClick={this.updateData(DATA_SOURCES.OPEN_WEATHER)}>{DATA_SOURCES.OPEN_WEATHER}</button>
                <button onClick={this.updateData(DATA_SOURCES.CSV)}>{DATA_SOURCES.CSV}</button>
            </div>
        )
    }

    render() {
        if(this.state.loading) {
            return <h1>Loading</h1>
        }
        return (
            <div>
                {this.renderButtons()}
                <Table data={this.state.data} />
            </div>
        );
    }
}
