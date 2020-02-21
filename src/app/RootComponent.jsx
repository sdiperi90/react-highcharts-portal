import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import {Provider} from "react-redux"
import HighchartsStore from "./store/highcharts-store"

export default class RootComponent extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Provider store={HighchartsStore}>
                <BrowserRouter>
                    <MainLayout />
                </BrowserRouter>
            </Provider>
        );
    }
}