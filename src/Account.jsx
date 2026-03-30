import { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./Navbar";

function Account() {

  const [user, setUser] = useState(null);
  const [visits, setVisits] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    api.get("/api/me")
      .then(res => setUser(res.data))
      .catch(() => {
        window.location.href = "/login";
      });

    api.get("/api/visits/my-visits")
      .then(res => {
        setVisits(res.data);
      })
      .catch(err => {
        console.error("Could not fetch visits", err);
      });

  }, []);

  if (!user) return <div>Loading...</div>;

  return (

    <>
      <Navbar />

      <div className="container py-4">

        <h3>Account</h3>

        <p><b>Username:</b> {user.username}</p>

        <hr/>

        <h4>Your Site Visits</h4>

        {visits.length === 0 && (
          <p className="text-muted">No visits booked yet.</p>
        )}

        {visits.map(v => (

          <div key={v.id} className="card p-3 mb-3 shadow-sm">

            <h5>{v.property_name}</h5>

            <p className="text-muted">
              {v.locality}, {v.city}
            </p>

            <p>
              Visit Date: <b>{v.visit_date}</b>
            </p>

          </div>

        ))}

      </div>
    </>
  );
}

export default Account;