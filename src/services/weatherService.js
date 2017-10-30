import request from 'request-promise-native';

import { DATA_SOURCES } from '../constants/data-sources';
import { kelvinToCelcius } from '../utils/temperature';

// In reality I would prefer to do this with a redux flow.
// I would dispatch an action from App container, which would make an API call, then add that to redux store...
// I would then probably put my 'adapt' functions below into my selectors, before handing over the data as props to the App container

class WeatherService {

    getData(dataSource) {
        let data;
        switch(dataSource) {
            case DATA_SOURCES.CSV:
                data = this._getCsvData();
                break;
            case DATA_SOURCES.OPEN_WEATHER:
            default:
                data = this._getOpenWeatherData();
                break;
        }

        return data;
    }

    _getCsvData() {
        return request.get('http://localhost:8080/weatherData.csv')
        .then(data => {
            return this._adaptCsvData(data)
        });
    }

    _getOpenWeatherData() {
        // hard coded to london -- would be better to allow user input
        // api key should be stored in a config
        var options = {
            uri: 'http://api.openweathermap.org/data/2.5/forecast?q=London&APPID=3ffe95d9dbeef5672c58df51ef4a6d02',
            json: true
        };
        
        return request.get(options)
        .then((data) => {
            return this._adaptOpenWeatherData(data);
        });
    }

    _adaptOpenWeatherData(data) {
        const list = data.list;
        let accumulatedData = new Map();

        list.forEach(item => {
            const dateTime = item.dt_txt.split(' ');
            const temperature = item.main.temp;
            this._accumulateDataByDay(accumulatedData, [...dateTime, temperature]);
        });
        return accumulatedData;
    }

    _adaptCsvData(data) {
        const lines = data.split(/\r?\n/);
        let accumulatedData = new Map();

        lines.forEach(line => {
            const dataArray = line.split(',');
            this._accumulateDataByDay(accumulatedData, dataArray);
        });
        return accumulatedData;
    }

    _accumulateDataByDay(acc, dataArray) {
        const [date, time, temp] = dataArray;
        if (!acc.get(date)) {
            acc.set(date, { date, chunks: []});
        }
        let chunk = { time, temp: kelvinToCelcius(temp) };
        acc.get(date).chunks.push(chunk);
    }
}

export default new WeatherService();
