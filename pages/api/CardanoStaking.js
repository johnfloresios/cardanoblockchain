import {
	  ResponsiveContainer,
	  AreaChart,
	  XAxis,
	  YAxis,
	  Area,
	  Tooltip,
	  CartesianGrid,
} from "recharts";
import React, { Component } from 'react';
import { format, parseISO, subDays } from "date-fns";
import '../../styles/globals.css';

export class CardanoStaking extends React.Component {

	  state = {
		      loading: true,
		      staking: null,
		      stakingSummary: null,
		      price: null,
		      stakePoolMapping: null,
		      epochMapping: null,
		    };

	  async componentDidMount() {
		      const stakingAddress = this.props.params.match.params.addr;
		      const priceUrl = "https://api.coinpaprika.com/v1/tickers/ada-cardano";
		      const priceResponse = await fetch(priceUrl);
		      const priceData = await priceResponse.json();

		      const stakeUrl = "https://cardano-mainnet.blockfrost.io/api/v0/accounts/" + stakingAddress + "/rewards";
		      const stakeResponse = await fetch(stakeUrl, {
			            headers: {
					            'Content-Type': 'application/json',
					            'project_id': '0Uu2hzCnBo2cIEkaQzMoGqb9BEXxQCcw',
					          }
			          });
		      const stakeData = await stakeResponse.json();

		      const stakeSummaryUrl = "https://cardano-mainnet.blockfrost.io/api/v0/accounts/" + stakingAddress;
		      const stakeSummaryResponse = await fetch(stakeSummaryUrl, {
			            headers: {
					            'Content-Type': 'application/json',
					            'project_id': '0Uu2hzCnBo2cIEkaQzMoGqb9BEXxQCcw',
					          }
			          });
		      const stakeSummaryData = await stakeSummaryResponse.json();

		      var stakePoolDataMapping = new Map();
		      var epochDataMapping = new Map();
		      stakeData.forEach(async(data) => {
			            const stakePoolUrl = "https://cardano-mainnet.blockfrost.io/api/v0/pools/" + `${data.pool_id}` + "/metadata";
			            const stakePoolSummaryResponse = await fetch(stakePoolUrl, {
					            headers: {
							              'Content-Type': 'application/json',
							              'project_id': '0Uu2hzCnBo2cIEkaQzMoGqb9BEXxQCcw',
							            }
					          });
			            const stakePoolData = await stakePoolSummaryResponse.json();
			            stakePoolDataMapping.set(stakePoolData.pool_id, stakePoolData.ticker);

			            const epochUrl = "https://cardano-mainnet.blockfrost.io/api/v0/epochs/" + `${data.epoch}`;
			            const epochSummaryResponse = await fetch(epochUrl, {
					            headers: {
							              'Content-Type': 'application/json',
							              'project_id': '0Uu2hzCnBo2cIEkaQzMoGqb9BEXxQCcw',
							            }
					          });
			            const epochData = await epochSummaryResponse.json();
			            epochDataMapping.set(epochData.epoch, epochData.end_time)
			          });

		      this.setState({epochMapping: epochDataMapping, stakePoolMapping: stakePoolDataMapping, stakingSummary: stakeSummaryData, staking: stakeData, price: priceData, loading: false})
		    }

	  render() {
		        return (

				        <div>
				        <div className="heading-spacer"></div>
				        <div><h2 className="header">Staking Data</h2></div>
				        <div className="heading-spacer"></div>
				  {this.state.loading ? 
					    <div>Loading Market Data...</div> : 
					    <div>
					      <div><span className="price">Balance: {convertLovelace(this.state.stakingSummary.controlled_amount)} ADA</span><span className="market-data-spacer-horizontal"></span><span className="price">Value: ${convertValue((this.state.stakingSummary.controlled_amount/1000000 * this.state.price.quotes.USD.price))} USD</span><span className="price">Total Rewards: {convertLovelace(this.state.stakingSummary.rewards_sum)} ADA</span><span className="market-data-spacer-horizontal"></span><span className="price">Total Rewards Value: ${convertValue((this.state.stakingSummary.rewards_sum/1000000 * this.state.price.quotes.USD.price))}</span></div>
					      <div className="spacer-down" />
					      <ResponsiveContainer width="100%" height={400}>
					            <AreaChart data={this.state.staking}>
					              <defs>
					                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
					                  <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
					                  <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
					                </linearGradient>
					              </defs>
					      
					              <Area dataKey="amount" stroke="#00ff00" fill="url(#color)" />
					      
					              <XAxis
					                dataKey="epoch"
					                axisLine={false}
					                tickLine={false}
					                tickFormatter={(str) => {
								                return str;
								              }}
					              />
					      
					              <YAxis
					                datakey="amount"
					                axisLine={false}
					                tickLine={false}
					                tickCount={8}
					                tickFormatter={(number) => `${convertLovelace(number.toFixed(2))}`}
					              />
					      
					              <Tooltip content={<CustomTooltip stakePoolData={this.state.stakePoolMapping} epochData={this.state.epochMapping}/>} />
					      
					              <CartesianGrid opacity={0.1} vertical={false} />
					            </AreaChart>
					          </ResponsiveContainer>

					    </div>
					    }
				  </div>
				      );
		    }
}

function CustomTooltip({ active, payload, label, stakePoolData, epochData }) {
	  if (active) {
		      const poolId = payload[0].payload.pool_id;
		      return (
			            <div className="tooltip">
			              <h4>Epoch&nbsp;{label}</h4>
			              <p>Reward:&nbsp;{convertLovelace(payload[0].value)} ADA</p>
			              <p>Pool:&nbsp;{stakePoolData.get(poolId)}</p>
			              <p>Reward Date:&nbsp;{convertDate(epochData.get(label)).toLocaleDateString("en-US")}</p>
			            </div>
			          );
		    }
	  return null;
}

function convertLovelace(value) {
	  var convertedValue = (value/1000000);
	  return convertValue(convertedValue);
}

function convertValue(value) {
  return value.toLocaleString(
    undefined, 
    { minimumFractionDigits: 2 }
  )
}

function convertDate(value) {
  return new Date(value * 1000);
}
