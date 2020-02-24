import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import getSeriesData from "../../../util/global-functions";
import { getMonthlyStocksTimeSeries } from "../../../actions/stock-actions";
import PropTypes from "prop-types";

class MonthlyStocks extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMonthlyStocksTimeSeries("GOOGL");
  }

  render() {
    if (this.props.monthlyStocks) {
      const monthlyStocks = getSeriesData(
        this.props.monthlyStocks["Monthly Time Series"]
      );
      const options = {
        title: {
          text: "Monthly Stocks of Google"
        },
        rangeSelectot: {
          selected: 6
        },
        series: [
          {
            name: "AAPL",
            data: monthlyStocks
          }
        ]
      };

      return (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      );
    } else {
      return <h5>Loading...</h5>;
    }
  }
}

MonthlyStocks.propTypes = {
  monthlyStocks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  monthlyStocks: state.stockReducer.monthlyStocks
});

export default connect(mapStateToProps, { getMonthlyStocksTimeSeries })(
  MonthlyStocks
);
