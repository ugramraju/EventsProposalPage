import React from "react";
import UserHeader from "../headers/userHeader";
import "./EventDetails.css";
import Events from "./events";

const EventDetails = () => {
  return (
    <div>
      <UserHeader />
      <section className="top-background"></section>
      <h1 style={{textAlign:"left", marginLeft:"100px"}}>Proposals</h1>
      <section>
        <Events/>
      </section>
    </div>
  );
};

export default EventDetails;
