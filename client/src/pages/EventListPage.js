import React from 'react'
import { Fragment } from 'react'
import EventList from '../components/Events/EventList/EventList'
import Header from '../components/Layout/Header'

function EventListPage() {
  return (
   <Fragment>
    <Header/>
    <EventList/>
   </Fragment>
  )
}

export default EventListPage