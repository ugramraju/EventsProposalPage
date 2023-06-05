import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DisplayEvent from "../DisplayEventsDetails/DisplayEvents";

const Events = () => {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://my-eventproposalpage.onrender.com/api/getproposals");
        setProposals(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(proposals); // Debugging: Check the content of proposals array

  const handleClick = (proposal) => {
    setSelectedProposal(proposal);
  };

  return (
    <div className="events_display_container">
      {proposals.map((item) => {
        console.log(item); // Debugging: Check the structure of item object
        return (
          <Link key={item._id} to={`/proposals/${item._id}`}>
            <div
              style={{
                boxShadow: "0px 3px 6px #00000029",
                borderRadius: "4px",
                margin: "10px",
                height: "200px",
                width: "200px",
              }}
              onClick={() => handleClick(item)}
            >
              {item.images.length > 0 && <img src={item.images[0]} alt="imagepic" />}
              <div className="events-budget-name-box">
                <p style={{ margin: "0", padding: "0", fontWeight: "bold", fontSize: "0.8em" }}>{item.eventName}</p>
                <p style={{ margin: "0", padding: "0", fontWeight: "bold" }}>{item.budget}</p>
                <p style={{ margin: "0", padding: "0" }}>{item.placeOfEvent}</p>
              </div>
            </div>
          </Link>
        );
      })}
      {selectedProposal && <DisplayEvent proposal={selectedProposal} />}
    </div>
  );
};

export default Events;
