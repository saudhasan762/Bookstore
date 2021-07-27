import React from 'react';
import Popper from '@material-ui/core/Popper';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { makeStyles } from '@material-ui/core/styles';
import MarkunreadMailboxOutlinedIcon from '@material-ui/icons/MarkunreadMailboxOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import './Profile.scss'
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop:"8%",
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const logout = () => {
  localStorage.removeItem('Token');
  window.location.replace("/Bookstore/Login");
}

const wishlist = () => {
    window.location.replace("/Dashboard/WishList");
}

export default function Profile() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <PermIdentityIcon className="proicon" aria-describedby={id} type="button" onClick={handleClick} onClickA/>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className={classes.paper}>
          <div className="profile_main">
            <b>Hi Saud,</b>
            <p>To Access account & manage Orders</p>
            <div style={{display: "flex", flexDirection: "row",padding:"10px",cursor: "pointer"}} onClick={wishlist}>
                <FavoriteBorderOutlinedIcon  style={{fontSize:"22", color:"gray",paddingTop: "2px"}}></FavoriteBorderOutlinedIcon>
                <p style={{paddingLeft: "10px"}}>Wishlist</p>
            </div>
            <button className="profile_btn" onClick={logout}>LOGOUT</button>
          </div>
        </div>
      </Popper>
    </>
  );
}