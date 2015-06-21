import React from 'react'

import Navbar from "./Navbar.js"
import AlertBar from "./AlertBar.js"

import Router from "react-router"
const RouteHandler = Router.RouteHandler;
const Link = Router.Link;

export default class Main extends React.Component {
	render() {
		return (
      <div className="container">
      	<Navbar title="Steve's Time Card" />
      	<AlertBar />
        <RouteHandler {...this.params} />
      </div>
		)	
	}	
}