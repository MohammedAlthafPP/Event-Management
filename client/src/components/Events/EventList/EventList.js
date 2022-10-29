import React, { Fragment } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors,getAllEvents,deleteEvent} from "../../../redux/action/eventAction";
import Sidebar from "../../Dashboard/Sidebar";
import "./EventList.css";
import {  useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_EVENT_RESET } from "../../../constants/constants";
import { useEffect } from "react";
import {toast } from 'react-toastify';



function EventList() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { error, events} = useSelector((state)=> state.allEvents);
  
  console.log(events&&events);
  const { error:deleteError, isDeleted,message} = useSelector((state)=> state.deleteEvent);


  const deleteProductHandler = (id,name) => {
   dispatch(deleteEvent(id))


  }

  useEffect(() => {
    if(error){
      toast.error(error.message);
      dispatch(clearErrors())
    }
    if(deleteError){
      toast.error(deleteError.message);
      dispatch(clearErrors())
    }

    if(isDeleted) {
      toast.success(message);
      navigate(`/admin/events`);
      dispatch({type:DELETE_EVENT_RESET});

    }

    dispatch(getAllEvents())
  }, [dispatch,error,navigate,isDeleted,deleteError,message])
  

  const columns = [
    {field : "id", headerName : "Product ID", minWidth: 200, flex: 0.5},
    {field : "groom", headerName : "Groom", minWidth: 200, flex: 0.5},
    {field : "bride", headerName : "Bride", minWidth: 200, flex: 0.5},
    {field : "date", headerName : "Wedding Date", minWidth: 200, flex: 0.5},
    {field : "action", headerName : "Action", minWidth: 150, flex: 0.3,sortable:false,
    renderCell: (params) => {
      return(
        <Fragment>
          {/* <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
            <EditIcon/>
          </Link> */}
          <Button onClick={() => deleteProductHandler(params.getValue(params.id,"id"),params.getValue(params.id,"name"))}>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }
  
  },
  ];

  const rows = [];

  events && events.length >0 && events.forEach((item) => {
    rows.push({
      id:item._id,
      groom: item.groomDetails?.name ?? 'Not fill yet',
      bride:item.brideDetails?.name ?? 'Not fill yet',
      date : String(item.marriageDetails?.date ?? 'Not filled').substr(0, 10),
    })
  })


  return (
    <div className="dashboard">
    <Sidebar/>
      <div className="eventListContainer">
      <h1 id="eventListHeading">ALL EVENTS</h1>
      <DataGrid 
      rows={rows}
      columns={columns}
      pageSize={10}
      disableSelectionOnClick
      className="eventListTable"
      autoHeight
      />
    </div>
  </div>
  )
}




export default EventList