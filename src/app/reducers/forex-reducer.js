import {
  FX_DAILY,
  FX_WEEKLY,
  FX_MONTHLY,
  MULTIPLE_FX_SERIES_MONTHLY
} from "../actions/highcharts-action-types";

const initialForexState = {
  dailyExchangeRate: {},
  weeklyExchangeRate: {},
  monthlyExchangeRate: {},
  exchangeRatesComparison: []
};

export default function(state = initialForexState, action) {
  switch (action.type) {
    case FX_DAILY:
      state = {
        ...state,
        dailyExchangeRate: action.payload
      };
      break;
    case FX_WEEKLY:
      state = {
        ...state,
        weeklyExchangeRate: action.payload
      };
      break;
    case FX_MONTHLY:
      state = {
        ...state,
        monthlyExchangeRate: action.payload
      };
      break;
    case MULTIPLE_FX_SERIES_MONTHLY:
      state = {
        ...state,
        exchangeRatesComparison: action.payload
      };
      break;
  }

  return state;
}
