import React, { Fragment, useState } from "react";
import "./newEvent.css";
import { useDispatch, useSelector } from "react-redux";
import {clearErrors,craeteBride} from "../../../redux/action/eventAction";
import Face2Icon from '@mui/icons-material/Face2';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PublicIcon from '@mui/icons-material/Public';
import SideBar from "../../Dashboard/Sidebar";
import { CREATE_BRIDE_RESET } from "../../../constants/constants";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {toast } from 'react-toastify';



function NewEvent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { error, success,message,loading } = useSelector((state) => state.newEvent);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [father, setFather] = useState("");
  const [country, setCountry] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Bride3.jpg");

console.log(name,address,age,father,country,avatar);
  const [user, setUser] = useState({
    name: "",
    address: "",
    age: "",
    father: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success(message);
      navigate("/admin/event/groom");
      dispatch({ type: CREATE_BRIDE_RESET });
    }
  }, [dispatch, error, success, navigate,message]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("age", age);
    myForm.set("address", address);
    myForm.set("father", father);
    myForm.set("country", country);
    myForm.set("avatar", avatar);

    
    dispatch(craeteBride(myForm));
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
          <h1>Bride Details</h1>
          <div>
            <Face2Icon />
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <EventAvailableIcon />
            <input
              type="number"
              placeholder="Age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div>
            <AddHomeWorkIcon />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>

          <div>
            <FamilyRestroomIcon />
            <input
              type="text"
              placeholder="Father"
              required
              value={father}
              onChange={(e) => setFather(e.target.value)}
            />
          </div>

          <div>
            <PublicIcon />
            <input
              type="text"
              placeholder="Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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
            Create
          </Button>
        </form>
      </div>
    </div>
  </Fragment>
  );
}

export default NewEvent;
