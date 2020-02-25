import {
  FX_DAILY,
  FX_WEEKLY,
  FX_MONTHLY,
  MULTIPLE_FX_SERIES_MONTHLY
} from "./highcharts-action-types";

export const getDailyForexTimeSeries = (fromSymbol, toSymbol) => dispatch => {
  fetch(
    `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=U9SLOWU4L29URCKD`
  )
    .then(
      response => response.json(),
      reason => Promise.reject(reason)
    )
    .then(
      data => {
        dispatch({
          type: FX_DAILY,
          payload: data
        });
      },
      reason => {
        dispatch({
          type: FX_DAILY,
          payload: reason
        });
      }
    );
};

export const getWeeklyForexTimeSeries = (fromSymbol, toSymbol) => dispatch => {
  fetch(
    `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=U9SLOWU4L29URCKD`
  )
    .then(
      response => response.json(),
      reason => Promise.reject(reason)
    )
    .then(
      data => {
        dispatch({
          type: FX_WEEKLY,
          payload: data
        });
      },
      reason => {
        dispatch({
          type: FX_WEEKLY,
          payload: reason
        });
      }
    );
};

export const getMonthlyForexTimeSeries = (fromSymbol, toSymbol) => dispatch => {
  fetch(
    `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${fromSymbol}&to_symbol=${toSymbol}&apikey=U9SLOWU4L29URCKD`
  )
    .then(
      response => response.json(),
      reason => Promise.reject(reason)
    )
    .then(
      data => {
        dispatch({
          type: FX_MONTHLY,
          payload: data
        });
      },
      reason => {
        dispatch({
          type: FX_MONTHLY,
          payload: reason
        });
      }
    );
};

export const getMonthlyForexSeriesForComparison = (
  fromSymbol,
  ...toSymbol
) => dispatch => {
  Promise.all(
    toSymbol.map(foreignCurrency => {
      return fetch(
        `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${fromSymbol}&to_symbol=${foreignCurrency}&apikey=U9SLOWU4L29URCKD`
      )
        .then(
          response => response.json(),
          reason => Promise.reject(reason)
        )
        .then(
          exchangeData => exchangeData,
          reason =>
            dispatch({
              type: MULTIPLE_FX_SERIES_MONTHLY,
              payload: reason
            })
        );
    })
  ).then(data => {
    dispatch({
      type: MULTIPLE_FX_SERIES_MONTHLY,
      payload: data
    });
  });
};
