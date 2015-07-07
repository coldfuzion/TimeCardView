/*
 * TimeCard View
 * Copyright ©2015 Thomas Nelson, Jacob Nichols, David Opp, Todd Brochu,
Andrew McGown, Sasha Fahrenkopf, Cameron B. White.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE text file in the root directory of this source tree.
 */
import React from "react"
import Router, { RouteHandler, Link} from "react-router"
import _ from "underscore"
import moment from "moment"
import FluxComponent from 'flummox/component';
import flux from "../stores/flux"
import AlertBar from "./AlertBar.js"

export default class PayPeriodsOverview extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores={['days', 'timeSheet']}>
        <PayPeriods {...this.props}/>
      </FluxComponent>
    )
  }
}

class PayPeriods extends React.Component {
  render() {
    var weeks = _.chain(this.props.days)
      .groupBy((element, index) => Math.floor(index/7))
      .map(eachWeek => {
        const days = _.chain(eachWeek).map(eachDay => <Day {...eachDay} />)
        const start_date = _.first(eachWeek).date.format("MMMM DD")
        const end_date = _.last(eachWeek).date.format("MMMM DD")
        return (<PayPeriod>{days}</PayPeriod>)
      })
    return (
      <div className="row time-overview">
        <div className="col-xs-12">
            <AlertBar />
            {weeks}
        </div>
      </div>
    )
  }
}

class PayPeriod extends React.Component {
  render() {
    const children = this.props.children
    const startDate = children.first().value().props.date.format("MMMM DD")
    const endDate = children.last().value().props.date.format("MMMM DD")
    const urlDate = children.first().value().props.date.format("YYYY-MM-DD")
    return (
      <div className="payperiod-overview">
        <Link to="payperiod" params={{date: urlDate}}>
          <h3>{startDate + " - " + endDate}</h3>
        </Link>
        <ul className="week-overview clearfix">
            {this.props.children}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    return (
      <li className="day-as-txt">
        <div className="time-entry shadowed-box">
          <Link to="day" params={{ date: this.props.date.format("YYYY-MM-DD")}}>
            <div className="date-side-box">
                <p className="day-as-text text-center">{this.props.date.format("dddd")}</p>
                <p className="date text-center">{this.props.date.format("M.")}<span className="day-as-number">{this.props.date.format("D")}</span></p>
            </div>
            <p className="hours-worked-text"><span className="hours-worked-number text-center">{this.props.hours} </span>
            hours worked</p>
          </Link>
        </div>
      </li>
    )
  }
}
