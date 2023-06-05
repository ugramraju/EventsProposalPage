import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import UserHeader from "../headers/userHeader";
import "./DisplayEvents.css";
import BackgroundImage from "../images/private-party-venues.png"
import Events from "../userProposals/events";
const MainDisplay = () => {
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

  const { images,placeOfEvent, budget,createdBy } = proposal;

  return (
    <div className="display_events_last">
      <div className="main_container_header">
        <UserHeader />
      </div>
      <div className="background_image_container">
  <img src={BackgroundImage} alt="background" className="background_image" />
</div>

      <div className="display_selected_event_heading_container">
      <h1 style={{fontSize:"1.2em"}}>Selected</h1>
      <div className="display_selected_event_container">
      <img src={images[0]} alt="Proposal" width="100px"/>
          <p style={{ margin: "0",fontWeight:"600", marginLeft:"5%"}}>{createdBy.name}</p>
          <p style={{ margin: "0", marginLeft:"5%"}} >{budget}</p>
          <p style={{ margin: "0", marginLeft:"5%" }}>{placeOfEvent}</p>
          <button style={{ cursor: "pointer", background:"white",border:"0px solid black",color:"red", float:"right" }}>
            <Link to={"/eventDetails"}>X</Link></button>
      </div>
      </div>

      <div className="proposals_againdispaly_container">
        <h1 style={{fontSize:"1.2em"}}>Proposals</h1>
        <Events/>
      </div>
        </div>
   
  );
};

export default MainDisplay;
