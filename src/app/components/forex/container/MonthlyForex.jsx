import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import PropTypes from "prop-types";
import { getMonthlyForexTimeSeries } from "../../../actions/forex-action";
import getSeriesData from "../../../util/global-functions";

class MonthlyForex extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getMonthlyForexTimeSeries("EUR", "UZS");
  }
  render() {
    if (this.props.monthlyExchangeRate) {
      const exchangeSeriesData = getSeriesData(
        this.props.monthlyExchangeRate["Time Series FX (Monthly)"]
      );
      const options = {
        chart: {
          type: "line"
        },
        title: {
          text: "Monthly Forex of EUR-To-UZS"
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
MonthlyForex.propTypes = {
  monthlyExchangeRate: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  monthlyExchangeRate: state.forexReducer.monthlyExchangeRate
});

export default connect(mapStateToProps, { getMonthlyForexTimeSeries })(
  MonthlyForex
);
