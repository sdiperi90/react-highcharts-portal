import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import getSeriesData from "../../../util/global-functions";
import { getMonthlyStocksForComparison } from "../../../actions/stock-actions";
import PropTypes from "prop-types";

class MonthlyStocksComparison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocksOf: ["AAPL", "GOOGL", "MSFT"]
    };
  }

  componentDidMount() {
    console.log("STATE", this.state.stocksOf);
    this.props.getMonthlyStocksForComparison(...this.state.stocksOf);
  }

  render() {
    this.props.monthlyStocksSeries &&
      console.log("TEST", this.props.monthlyStocksSeries);
    let seriesOptions = [];
    for (let i = 0; i < this.props.monthlyStocksSeries.length; i++) {
      const stock = this.props.monthlyStocksSeries[i];
      console.log("stock", stock);
      seriesOptions[i] = {
        name: this.state.stocksOf[i],
        data: getSeriesData(stock["Monthly Time Series"])
      };
    }
    console.log("seriesOption", seriesOptions);
    if (this.props.monthlyStocksSeries.length > 0) {
      const options = {
        title: {
          text: `Monthly Stocks of - ${this.state.stocksOf}`
        },
        rangeSelector: {
          selected: 6
        },
        //to do comparison of multiple company's stocks
        plotOptions: {
          series: {
            compare: "percent"
          }
        },

        series: seriesOptions
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

MonthlyStocksComparison.propTypes = {
  monthlyStocksSeries: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  monthlyStocksSeries: state.stockReducer.monthlyStocksSeries
});

export default connect(mapStateToProps, { getMonthlyStocksForComparison })(
  MonthlyStocksComparison
);
