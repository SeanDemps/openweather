import { expect } from 'chai';
import sinon from 'sinon';

import { WeatherService } from './weatherService';

let requestMock;
let data;
let weather;

describe('weatherService', () => {
    beforeEach(() => {
        data = {
            list: [
                {
                    main: { temp: 280.32 },
                    dt_txt: "2017-11-01 03:00:00"
                },
                {
                    main: { temp: 270.32 },
                    dt_txt: "2017-11-01 09:00:00"
                },
                {
                    main: { temp: 260.32 },
                    dt_txt: "2017-11-02 09:00:00"
                }
            ]
        };

        requestMock = {
            get: sinon.stub().returns(Promise.resolve(data))
        }
        weather = new WeatherService(requestMock);
    });

    describe('getData', () => {
        it('should get data and adapt correctly for openweather', () => {
            const expectedData = new Map();
            expectedData.set(
                '2017-11-01',
                { date: '2017-11-01', chunks: [
                    { time: '03:00:00', temp: 8 },
                    { time: '09:00:00', temp: -2 }
                ]}
            );

            expectedData.set(
                '2017-11-02',
                { date: '2017-11-02', chunks: [
                    { time: '09:00:00', temp: -12 }
                ]}
            );
            return weather.getData('openweather').then((data) => {
                expect(data).to.deep.equal(expectedData);
            });
        });
        
        // it('should get data and adapt correctly for csv', () => {
        //      add mock csv file and use fs readFile to use here and adapt
        // }
    })
})
