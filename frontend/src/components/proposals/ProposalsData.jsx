import React, { useState, useEffect } from "react";
import "./ProposalsData.css";
import Edit from "../images/pencil-edit-button.png";
import Delete from "../images/bin.png";
import Search from "../images/search.png";
import { FaFilter } from "react-icons/fa";
import Header from "../headers/header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProposalsData() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/proposals", {
        headers: {
          "x-token": token,
        },
      });
      setProposals(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!token) {
    alert("Please login first");
    navigate("/");
  } else {
    try {
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Invalid token");
    }
  }
}, [navigate, token]);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this proposal?");
      if (confirmed) {
        await axios.delete(`http://localhost:8000/api/proposals/${id}`, {
          headers: {
            "x-token": token,
          },
        });
        setProposals((prevProposals) => prevProposals.filter((eachData) => eachData._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (proposal) => {
    navigate(`/editProposal/${proposal._id}`);
  };

  function handleNav() {
    navigate(`/proposalsForm`);
  }

  const filteredProposals = searchTerm
    ? proposals.filter((proposal) =>
        proposal.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : proposals;

  return (
    <div className="total-container">
      <section className="imported-header">
        <Header />
      </section>
      <section className="total-proposals-container">
        <section className="header-search-box">
          <section className="proposals-search-container">
            <h1 style={{ color: "#081838", fontSize: "24px" }}>Proposals</h1>
            <section>
              <label htmlFor="search">
                <img src={Search} alt="search" height={"15px"} />
              </label>
              <input
                type="text"
                id="search"
                style={{
                  width: "200px",
                  height: "30px",
                  borderRadius: "5px",
                  border: "0px solid",
                  color: "black",
                }}
                placeholder="Search projects"
                onChange={handleSearch}
              />
            </section>
          </section>
          <section className="filter-create-container">
            <span>
              <FaFilter size={25} />
            </span>
            <button className="create-button" onClick={handleNav}>
              CREATE
            </button>
          </section>
        </section>
        {filteredProposals.map((item) => (
          <div
            key={item._id}
            className="container"
            style={{ marginBottom: "15px" }}
          >
            <section className="eventName-heading">
              Event Name<p>{item.eventName}</p>
            </section>
            <section className="events-container" style={{ display: "flex" }}>
              <section className="container-row" style={{ display: "flex" }}>
                <div>
                  Event Type<p>{item.eventType}</p>
                </div>
                <div>
                  Proposal Type<p>{item.proposalType}</p>
                </div>
                <div>
                  From Date<p>{item.fromDate}</p>
                </div>
                <div>
                  To Date<p>{item.toDate}</p>
                </div>
                <div>
                  Budget<p>{item.budget}</p>
                </div>
              </section>
              <section className="edit-delete-container">
                <button onClick={() => handleEdit(item)}>
                  <img src={Edit} alt="edit" />
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  <img src={Delete} alt="delete" />
                </button>
              </section>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ProposalsData;
