import React, { Fragment } from 'react'
import Home from '../components/Home/Home';
import Header from "../components/Layout/Header"

function HomePage() {
  return (
    <Fragment>
        <Header/>
        <Home/>
    </Fragment>
  )
}

export default HomePage