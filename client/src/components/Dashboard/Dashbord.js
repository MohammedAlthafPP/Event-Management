import { Typography } from '@mui/material'
import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import "./Dashboard.css"

function Dashbord() {
  return (
    <Fragment>
     <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        

        

        

      </div>
    </div>
    </Fragment>
  )
}

export default Dashbord