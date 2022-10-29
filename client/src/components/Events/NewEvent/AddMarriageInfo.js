import React, { Fragment, useState } from "react";
import "./newEvent.css";
import { useDispatch, useSelector } from "react-redux";
import {clearErrors,craeteMarriage} from "../../../redux/action/eventAction";
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import EventIcon from '@mui/icons-material/Event';
import SignpostIcon from '@mui/icons-material/Signpost';
import SideBar from "../../Dashboard/Sidebar";
import { CREATE_MARRIAGE_RESET } from "../../../constants/constants";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {toast } from 'react-toastify';



function AddMarriageInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success,message,loading} = useSelector((state) => state.newEvent);

  const [venu, setVenu] = useState("");
  const [address, setAddress] = useState("");
  const [date, SetDate] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Wedd.jpg");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }
  
    if (success) {
      toast.success(message);
      navigate("/admin/events");
      dispatch({ type: CREATE_MARRIAGE_RESET });
    }
  }, [dispatch, error, success, navigate,message]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("venu", venu);
    myForm.set("address", address);
    myForm.set("date", date);
    myForm.set("avatar", avatar);

    
    dispatch(craeteMarriage(myForm));
  };

  const createProductImagesChange = (e) => {
    if (e.target.name === "avatar") {
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setUser({ ...user, [e.target.name]: e.target.value });
      }
  };

 

  return (
    <Fragment>
    <div className="dashboard">
      <SideBar />
      <div className="newEventContainer">
        <form
          action=""
          className="createEventForm"
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <h1>Marriage Details</h1>
          <div>
            <EmojiTransportationIcon />
            <input
              type="text"
              placeholder="Venu"
              required
              value={venu}
              onChange={(e) => setVenu(e.target.value)}
            />
          </div>

          <div>
            <SignpostIcon />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
            <EventIcon />
            <input
              type="date"
              placeholder="Date"
              required
              value={date}
              onChange={(e) => SetDate(e.target.value)}
            />
          </div>

          <div id="createEventFormFile">
          <img src={avatarPreview} alt="Avatar Priview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
            />
          </div>

          

          <Button
            id="createProductBtn"
            type="submit"
           disabled={loading ? true : false}
          >
           Add
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  );
}




export default AddMarriageInfo