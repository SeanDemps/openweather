import weather from '../services/weatherService';

export const reducer = (state = [], action) => {
    switch (action.type) {
      case 'START_DATA_LOAD':
        return {
          ...state,
          loading: true
        }
      case 'DATA_LOADED':
        return {
          ...state,
          data: action.data,
          loading: false
        }
      case 'DATA_LOAD_ERROR':
        return {
          ...state,
          error: action.error
        }
      default:
        return state
    }
  }

function startDataLoad() {
  return {
    type: 'START_DATA_LOAD'
  }
};

function dataLoaded(data) {
  return {
    type: 'DATA_LOADED',
    data
  }
};

function dataLoadError(error) {
  return {
    type: 'DATA_LOAD_ERROR',
    error
  }
};
  
export function getWeatherData(source) {
  return function(dispatch) {
    dispatch(startDataLoad());
    return weather.getData(source).then(data => {
      dispatch(dataLoaded(data));
    }).catch(error => {
      dataLoadError(error);
    })
  };
}
