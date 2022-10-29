import React, { Fragment } from 'react'
import Dashbord from '../components/Dashboard/Dashbord'
import Header from "../components/Layout/Header"

function DashboardPage() {
  return (
    <Fragment>
      <Header/>
      <Dashbord/>
    </Fragment>
  )
}

export default DashboardPage