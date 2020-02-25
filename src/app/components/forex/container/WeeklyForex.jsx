import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";

import { getWeeklyForexTimeSeries } from "../../../actions/forex-action";
import getSeriesData from "../../../util/global-functions";

class WeeklyForex extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getWeeklyForexTimeSeries("GBP", "UZS");
  }
  render() {
    if (this.props.weeklyExchangeRate) {
      const exchangeSeriesData = getSeriesData(
        this.props.weeklyExchangeRate["Time Series FX (Weekly)"]
      );
      const options = {
        chart: {
          type: "line"
        },
        title: {
          text: "Weekly Forex of GBP-To-UZS"
        },
        rangeSelector: {
          selected: 6
        },
        series: [
          {
            name: "UZS",
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

WeeklyForex.propTypes = {
  weeklyExchangeRate: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weeklyExchangeRate: state.forexReducer.weeklyExchangeRate
});

export default connect(mapStateToProps, { getWeeklyForexTimeSeries })(
  WeeklyForex
);
