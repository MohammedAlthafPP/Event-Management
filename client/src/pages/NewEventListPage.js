import React from 'react'
import { Fragment } from 'react'
import NewEvent from '../components/Events/NewEvent/NewEvent'
import Header from '../components/Layout/Header'

function NewEventListPage() {
  return (
   <Fragment>
    <Header/>
    <NewEvent/>
   </Fragment>
  )
}

export default NewEventListPage
