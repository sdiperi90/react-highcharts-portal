import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";

import { getMonthlyForexSeriesForComparison } from "../../../actions/forex-action";
import getSeriesData from "../../../util/global-functions";

class MonthlyForexComparison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeOf: ["AED", "GBP", "UZS", "JPY"]
    };
  }
  componentDidMount() {
    this.props.getMonthlyForexSeriesForComparison(...this.state.exchangeOf);
  }
  render() {
    if (this.props.exchangeRatesComparison.length > 0) {
      var seriesOptions = [];
      for (let i = 0; i < this.props.exchangeRatesComparison.length; i++) {
        const exchange = this.props.exchangeRatesComparison[i];
        seriesOptions[i] = {
          name: this.state.exchangeOf[i],
          data: getSeriesData(exchange["Time Series FX (Monthly)"])
        };
      }
      const options = {
        chart: {
          type: "line"
        },
        title: {
          text: `Monthly Forex of - ${this.state.exchangeOf}`
        },
        rangeSelector: {
          selected: 6
        },
        plotOptions: {
          series: {
            compare: "percent"
          }
        },
        series: seriesOptions
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
MonthlyForexComparison.propTypes = {
  exchangeRatesComparison: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  exchangeRatesComparison: state.forexReducer.exchangeRatesComparison
});

export default connect(mapStateToProps, { getMonthlyForexSeriesForComparison })(
  MonthlyForexComparison
);
