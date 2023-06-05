import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";
import "./DisplayEvents.css"
import UserHeader from "../headers/userHeader";

const DisplayEvent = () => {
  const [proposal, setProposal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await axios.get(`https://my-eventproposalpage.onrender.com/api/getproposals/${id}`);
        setProposal(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProposal();
  }, [id]);

  if (!proposal) {
    return <div>Loading...</div>;
  }

  const { fromDate, images, events, description, foodPreferences, toDate, eventType, createdBy } = proposal;


  return (
    <div className="main_container_events">
      <div className="main_container_header"> <UserHeader/></div>
      <div className="main_container_select_btn">
      <p><Link to={"/eventDetails"}>Proposals&lt;</Link> <b style={{fontSize:"1.5em"}}> {createdBy.name}</b></p>
      <button><Link to={`/maindisplay/${id}`}>select </Link></button>
     
      </div>
    
    <div className="display_events_details_container">
      <div className="display_events_images_container">
        {images && <img src={images[0]} alt="Proposal" />}
        <p className="disply_id_box">ID:<b> {id}</b></p>
        <div className="display_events_details_box">
        <p>Name:<b>{createdBy.name}</b></p>
        <p style={{fontSize:"0.8em"}}>Email: <b>{createdBy.email}</b></p>
        <div style={{display:"flex", justifyContent:"space-between", fontSize:"0.8em"}}>
          <span>StartDate: <b>{fromDate}</b></span>
          <span>EndDate: <b>{toDate}</b></span>
        </div>
        <div style={{display:"flex", gap:"25%"}}>
          <div>
            <p style={{fontSize:"0.8em"}}>EventType</p>
            <p style={{color:"#006BD9", backgroundColor:"#D9ECFF", padding:"5px", fontSize:"0.8em"}}><b>{eventType}</b></p>
          </div>
          <div style={{fontSize:"0.8em"}}>
            <p>EventClass</p>
            <p><b>Class A</b></p>
          </div>
        </div>
        </div>
      </div>
      <div className="eventsvenue_arrangements">
        <h1>Venue and Arrangements</h1>
        {description}
      </div>
      <div className="events_food_preferences">
        <h1>Food Preferences</h1>
        {foodPreferences}
      </div>

      <div className="myalbums_container_box">
        <h1>My albums</h1>
        <div className="myalbums_container">
          {images.map((image, index) => (
            <img key={index} src={image} alt={index} />
          ))}
        </div>
      </div>
      <div className="events_contacts">
        <h1>Contacts</h1>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <div >
          <p>Contact 1</p>
          <p>+91 {createdBy.contact}</p>
        </div>
        <div>
          <p>Contact 2</p>
          <p>+91 9xxxxxxxxx</p>
        </div>
        <div>
          <p>Contact 3</p>
          <p>+91 9xxxxxxxxx</p>
        </div>
        </div>
      </div>
      <div className="events_container">
        <h1>Events</h1>
        {events}
      </div>
    </div>
    </div>
  );
};

export default DisplayEvent;
