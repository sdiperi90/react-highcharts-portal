import React, { Component } from 'react';
import { connect } from "react-redux";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

import { getDailyStocksTimeSeries } from "../../../actions/stock-actions";
import getSeriesData from "../../../util/global-functions";

class DailyStocks extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getDailyStocksTimeSeries("TSLA");
    }
    render() {
        if (this.props.dailyStocks) {
            const stockSeriesData = getSeriesData(this.props.dailyStocks["Time Series (Daily)"]);
            const options = {
                title: {
                    text: "Daily Stocks of MSFT"
                },
                rangeSelector: {
                    selected: 10
                },
                series: [
                    {
                        name: "MSFT",
                        data: stockSeriesData
                    }
                ]
            }
            return (
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={"stockChart"}
                        options={options}
                    />
                </div>
            )
        }
        else {
            return <h5>Loading...</h5>
        }
    }
}

const mapStateToProps = state => ({
    dailyStocks: state.stockReducer.dailyStocks
})

export default connect(mapStateToProps, { getDailyStocksTimeSeries })(DailyStocks);