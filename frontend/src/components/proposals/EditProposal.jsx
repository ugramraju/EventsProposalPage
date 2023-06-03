import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../headers/header";

const EditProposal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [placeOfEvent, setPlaceOfEvent] = useState("");
  const [proposalType, setProposalType] = useState("");
  const [eventType, setEventType] = useState("");
  const [budget, setBudget] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [foodPreferences, setFoodPreferences] = useState("");
  const [events, setEvents] = useState("");
  const [error, setError] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/proposals/${id}`, {
          headers: {
            "x-token": token,
          },
        });
        const proposalData = response.data.data;
        setEventName(proposalData.eventName);
        setPlaceOfEvent(proposalData.placeOfEvent);
        setProposalType(proposalData.proposalType);
        setEventType(proposalData.eventType);
        setBudget(proposalData.budget);
        setFromDate(proposalData.fromDate);
        setToDate(proposalData.toDate);
        setDescription(proposalData.description);
        setFoodPreferences(proposalData.foodPreferences);
        setEvents(proposalData.events);
        // Set preview images if available
        if (proposalData.images && proposalData.images.length > 0) {
          const images = proposalData.images.map((image) => image.url);
          setPreviewImages(images);
        }
      } catch (error) {
        setError("Failed to fetch proposal");
      }
    };

    if (!token) {
      alert("Please login first");
      navigate("/");
    } else {
      fetchProposal();
    }
  }, [id, navigate, token]);

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handlePlaceOfEventChange = (e) => {
    setPlaceOfEvent(e.target.value);
  };

  const handleProposalTypeChange = (e) => {
    setProposalType(e.target.value);
  };

  const handleEventTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setPostImage(files);
    const images = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(images);
  };

  const handleFoodPreferencesChange = (e) => {
    setFoodPreferences(e.target.value);
  };

  const handleEventsChange = (e) => {
    setEvents(e.target.value);
  };

  const handleX = () => {
    navigate(`/proposalsData`);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      !eventName ||
      !placeOfEvent ||
      !proposalType ||
      !eventType ||
      !budget ||
      !fromDate ||
      !toDate ||
      !description ||
      !foodPreferences ||
      !events
    ) {
      setError("Please fill in all the details");
      return;
    }

    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("placeOfEvent", placeOfEvent);
    formData.append("proposalType", proposalType);
    formData.append("eventType", eventType);
    formData.append("budget", budget);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("description", description);
    formData.append("foodPreferences", foodPreferences);
    formData.append("events", events);

    postImage.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.put(`http://localhost:8000/api/proposals/${id}`, formData, {
        headers: {
          "x-token": token,
        },
      });
      navigate("/proposalsData");
    } catch (err) {
      setError("Error in updating form");
      console.error(err);
    }
  };

  return (
    <section className="container">
      <section className="header-container">
        <Header />
      </section>
      <section className="body-container">
        <section className="main-container">
          <section className="header">
            <h1 className="form-heading-text">Edit Proposal</h1>
            <button className="into-symbol" onClick={handleX}>
              X
            </button>
          </section>
          <form className="form-container">
            <span
              style={{ color: "red", marginLeft: "5em", fontWeight: "bold" }}
            >
              {error}
            </span>
            <section className="form-inside-boxes">
              <section className="leftSide-container">
                <section className="eventName-text">
                  <label htmlFor="eventName">Event Name</label>
                </section>
                <input
                  type="text"
                  id="eventName"
                  onChange={handleEventNameChange}
                  name="eventName"
                  value={eventName}
                  placeholder="Name"
                  required
                />
                <section
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="side-by-side-inputs"
                >
                  <section>
                    <section className="label-text">
                      <label htmlFor="placeOfEvent">Place Of Event</label>
                    </section>
                    <select
                      id="placeOfEvent"
                      onChange={handlePlaceOfEventChange}
                      name="placeOfEvent"
                      value={placeOfEvent}
                      required
                    >
                      <option>Select</option>
                      <option value="bengalore">Bangalore</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="chennai">Chennai</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="kolkata">Kolkata</option>
                    </select>
                  </section>
                  <section>
                    <section className="label-text">
                      <label htmlFor="proposalType">Proposal Type</label>
                    </section>
                    <select
                      id="proposalType"
                      onChange={handleProposalTypeChange}
                      name="proposalType"
                      value={proposalType}
                      required
                    >
                      <option>Select</option>
                      <option value="venue">Venue</option>
                      <option value="birthday">Birthday</option>
                      <option value="catering">Catering</option>
                      <option value="awareness">Awareness</option>
                    </select>
                  </section>
                </section>
                <section
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="side-by-side-inputs"
                >
                  <section>
                    <section className="label-text">
                      <label htmlFor="eventType">Event Type</label>
                    </section>
                    <select
                      id="eventType"
                      onChange={handleEventTypeChange}
                      name="eventType"
                      value={eventType}
                      required
                    >
                      <option>Select</option>
                      <option value="marriage">Marriage</option>
                      <option value="birthday">Birthday</option>
                      <option value="preWedding">PreWedding</option>
                      <option value="otherEvent">Other Event</option>
                    </select>
                  </section>
                  <section>
                    <section className="label-text">
                      <label htmlFor="budget">Budget</label>
                    </section>
                    <input
                      type="number"
                      id="budget"
                      onChange={handleBudgetChange}
                      name="budget"
                      value={budget}
                      placeholder="000000"
                      required
                    />
                  </section>
                </section>
                <section
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="side-by-side-inputs"
                >
                  <section>
                    <section className="label-text">
                      <label htmlFor="fromDate">From</label>
                    </section>
                    <input
                      type="date"
                      id="fromDate"
                      onChange={handleFromDateChange}
                      name="fromDate"
                      value={fromDate}
                      required
                    />
                  </section>
                  <section>
                    <section className="label-text">
                      <label htmlFor="toDate">To</label>
                    </section>
                    <input
                      type="date"
                      id="toDate"
                      onChange={handleToDateChange}
                      name="toDate"
                      value={toDate}
                      required
                    />
                  </section>
                </section>
                <section>
                  <section className="label-text">
                    <label htmlFor="description">Description</label>
                  </section>
                  <textarea
                    type="textarea"
                    id="description"
                    onChange={handleDescriptionChange}
                    name="description"
                    value={description}
                    placeholder="Description"
                    required
                  />
                </section>
              </section>
              <section className="rightSide-container">
                <section className="file-container">
                  <label htmlFor="postImage">Images</label>
                  <input
                    className="file-input-container"
                    type="file"
                    name="postImage"
                    id="postImage"
                    multiple
                    onChange={handleImageChange}
                  />
                </section>
                <div className="preview-images-container">
                  {previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="previewImage"
                      width="50"
                      height="50"
                    />
                  ))}
                </div>
                <section>
                  <section className="label-text">
                    <label htmlFor="foodPreferences">Food Preferences</label>
                  </section>
                  <textarea
                    type="textarea"
                    id="foodPreferences"
                    onChange={handleFoodPreferencesChange}
                    name="foodPreferences"
                    value={foodPreferences}
                    placeholder="Preferences"
                    required
                  />
                </section>
                <section className="label-text">
                  <label htmlFor="events">Events</label>
                </section>
                <textarea
                  type="textarea"
                  id="events"
                  onChange={handleEventsChange}
                  name="events"
                  value={events}
                  placeholder="Events"
                  required
                />
              </section>
            </section>
            <button className="update-btn" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </section>
      </section>
    </section>
  );
};

export default EditProposal;
