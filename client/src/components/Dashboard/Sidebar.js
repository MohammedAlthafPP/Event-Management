import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from "@mui/icons-material/Add";
import Logo from "../../image/Adminlogo.png"
import { useDispatch } from "react-redux";
import {logout} from "../../redux/action/userAction"

function Sidebar() {

    const dispatch = useDispatch();

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }


  return (
    <div className="sidebar">
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>
      <Link to="">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Events">
            <Link to="/admin/events">
              {" "}
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/event/new">
              {" "}
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="" >
        <p onClick={logoutUser}>
          <ExitToAppIcon /> Logout
        </p>
      </Link>
     
      
    </div>
  );
}

export default Sidebar;
