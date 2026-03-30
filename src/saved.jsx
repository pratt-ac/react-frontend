import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import api from "./api";

function Saved() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get("/api/saved")
      .then(res => setProperties(res.data))
      .catch(() => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h3 className="mb-4">Saved Properties</h3>

        {properties.length === 0 && (
          <p className="text-muted">No saved properties yet.</p>
        )}

        <div className="row g-4">
          {properties.map(p => (
            <div key={p.id} className="col-md-4">
              <div
                className="card rounded-4 shadow-sm overflow-hidden"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.location.href = `/properties/${p.city}/${p.id}`
                }
              >
                <img
                  src={p.thumbnail}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{p.name}</h5>
                  <p className="text-muted mb-1">{p.locality}</p>
                  <h6 className="text-primary fw-bold">
                    ₹ {p.price.toLocaleString()}
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Saved;
