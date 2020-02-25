import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";

import { getDailyForexTimeSeries } from "../../../actions/forex-action";
import getSeriesData from "../../../util/global-functions";

class DailyForex extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getDailyForexTimeSeries("USD", "UZS");
  }
  render() {
    if (this.props.dailyExchangeRate) {
      const exchangeSeriesData = getSeriesData(
        this.props.dailyExchangeRate["Time Series FX (Daily)"]
      );
      const options = {
        chart: {
          type: "candlestick"
        },
        title: {
          text: "Daily Forex of USD-To-INR"
        },
        rangeSelector: {
          selected: 6
        },
        series: [
          {
            name: "INR",
            data: exchangeSeriesData
          }
        ]
      };
      return (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={options}
          />
        </div>
      );
    } else {
      return <h5>Loading...</h5>;
    }
  }
}

DailyForex.propTypes = {
  dailyExchangeRate: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  dailyExchangeRate: state.forexReducer.dailyExchangeRate
});

export default connect(mapStateToProps, { getDailyForexTimeSeries })(
  DailyForex
);
