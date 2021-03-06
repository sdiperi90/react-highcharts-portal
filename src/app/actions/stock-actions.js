import {
  STOCK_TIME_SERIES_DAILY,
  STOCK_TIME_SERIES_WEEKLY,
  STOCK_TIME_SERIES_MONTHLY,
  MULTIPLE_STOCKS_SERIES_MONTHLY
} from "./highcharts-action-types";

export const getDailyStocksTimeSeries = symbol => dispatch => {
  fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=U9SLOWU4L29URCKD`
  )
    .then(
      response => response.json(),
      reason => Promise.reject(reason)
    )
    .then(
      stocksData =>
        dispatch({ type: STOCK_TIME_SERIES_DAILY, payload: stocksData }),
      reason =>
        dispatch({
          type: STOCK_TIME_SERIES_DAILY,
          payload: reason
        })
    );
};

export const getWeeklyStocksTimeSeries = symbol => dispatch => {
  fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=U9SLOWU4L29URCKD`
  )
    .then(
      response => response.json(),
      reason => Promise.reject(reason)
    )
    .then(
      stocksData =>
        dispatch({ type: STOCK_TIME_SERIES_WEEKLY, payload: stocksData }),
      reason =>
        dispatch({
          type: STOCK_TIME_SERIES_WEEKLY,
          payload: reason
        })
    );
};

export const getMonthlyStocksTimeSeries = symbol => dispatch => {
  fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=U9SLOWU4L29URCKD`
  )
    .then(
      response => response.json(),
      reason => Promise.reject(reason)
    )
    .then(
      stocksData =>
        dispatch({ type: STOCK_TIME_SERIES_MONTHLY, payload: stocksData }),
      reason =>
        dispatch({
          type: STOCK_TIME_SERIES_MONTHLY,
          payload: reason
        })
    );
};

/**
 * Action compares monthly stock series
 * @param {string} symbols - es6 rest parameter. With the use of the rest parameter, we can gather any number of arguments into an array and do what we want with them.
 */

export const getMonthlyStocksForComparison = (...symbols) => dispatch => {
  Promise.all(
    symbols.map(symbol => {
      return fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=SH5VJ8C149PG8B7B`
      )
        .then(
          response => {
            // console.log("response", response.json());
            return response.json();
          },
          reason => Promise.reject(reason)
        )
        .then(
          stocksData => {
            // console.log("stocksData", stocksData);
            return stocksData;
          },
          reason =>
            dispatch({
              type: MULTIPLE_STOCKS_SERIES_MONTHLY,
              payload: reason
            })
        );
    })
  ).then(stocks => {
    // console.log("action stocks", stocks);
    dispatch({
      type: MULTIPLE_STOCKS_SERIES_MONTHLY,
      payload: stocks
    });
  });
};
