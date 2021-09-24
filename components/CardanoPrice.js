import "../styles/globals.css";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid
} from "recharts";
import React, { Component, StrictMode } from "react";
import { format, parseISO, subDays } from "date-fns";

export class CardanoPrice extends React.Component {
  state = {
    loading: true,
    price: null,
    history: null
  };

  async componentDidMount() {
    const priceUrl = "https://api.coinpaprika.com/v1/tickers/ada-cardano";
    const response = await fetch(priceUrl);
    const data = await response.json();

    const historyUrl =
      "https://api.coinpaprika.com/v1/tickers/ada-cardano/historical?start=2021-02-15T05:15:00Z&interval=1d";
    const historyResponse = await fetch(historyUrl);
    const historyData = await historyResponse.json();
    this.setState({
      price: data.quotes.USD,
      counter: 0,
      history: historyData,
      loading: false
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div>Loading Market Data...</div>
        ) : (
          <div>
            <div>
              <h1 className="header">Cardano</h1>
            </div>
            <div>
              <h2 className="header">Market Data</h2>
            </div>
            <div>
              <span className="price">
                Price: {this.state.price.price.toFixed(2)}{" "}
              </span>{" "}
              <span
                className={
                  this.state.price.percent_change_24h < 0
                    ? "percent-down"
                    : "percent-up"
                }
              >
                {this.state.price.percent_change_24h} %
              </span>{" "}
              <span className="price">
                ATH Price: {this.state.price.ath_price.toFixed(2)}
              </span>
              <span className="price">
                ATH Date:{" "}
                {format(parseISO(this.state.price.ath_date), "MMM, d, yyyy")}
              </span>
              <div className="spacer-down" />
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={this.state.history}>
                <defs>
                  <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="40%" stopColor="#2451B7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2451B7" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <Area dataKey="price" stroke={
                  this.state.price.percent_change_24h < 0
                    ? "red"
                    : "green"
                } fill="url(#color)" />

                <XAxis
                  dataKey="timestamp"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(str) => {
                    const date = parseISO(str);
                    const count = this.state.counter;
                    this.state.counter = count + 1;
                    if ((this.state.counter % 10) === 0) {
			                return format(date, "MMM d");
                    } else {
                      return "";
                    }
                  }}
                />

                <YAxis
                  datakey="price"
                  axisLine={false}
                  tickLine={false}
                  tickCount={8}
                  tickFormatter={(number) => `$${number.toFixed(2)}`}
                />

                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid opacity={0.1} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  }
}

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "d MMM, yyyy")}</h4>
        <p>{payload[0].value.toFixed(2)} ADA</p>
      </div>
    );
  }
  return null;
}
