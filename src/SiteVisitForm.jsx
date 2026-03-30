import { useState } from "react";
import api from "./api";

function SiteVisitForm({ property }) {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const submit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/api/visits", {
        property_id: property.id,
        property_name: property.name,
        city: property.city,
        locality: property.locality,
        visit_date: date
      });

      alert("Visit booked successfully!");

      setName("");
      setDate("");

    } catch (err) {

      console.error(err);
      alert("Could not book visit");

    }

  };

  return (

    <div className="card p-4 shadow-sm rounded-4">

      <h4 className="mb-3">Book a Site Visit</h4>

      <p className="text-muted">
        Schedule a visit to {property.name}
      </p>

      <form onSubmit={submit}>

        <div className="mb-3">

          <input
            className="form-control"
            placeholder="Your Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

        </div>

        <div className="mb-3">

          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            required
          />

        </div>

        <button className="btn btn-success w-100">
          Request Visit
        </button>

      </form>

    </div>

  );
}

export default SiteVisitForm;