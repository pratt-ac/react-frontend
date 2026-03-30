import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import Navbar from "./Navbar";

function PropertyDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);

  useEffect(() => {
    api.get(`/api/properties/${id}`)
      .then(res => setP(res.data))
      .catch(() => alert("Failed to load property"));
  }, [id]);

  if (!p) return null;

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <div className="row">
          <div className="col-md-7">
            <img
              src={p.thumbnail}
              className="img-fluid rounded-4 shadow-sm"
            />
          </div>

          <div className="col-md-5">
            <h2 className="fw-bold">{p.name}</h2>
            <p className="text-muted">{p.locality}, {p.city}</p>
            <p>{p.bhk} BHK • {p.sqft} sqft</p>

            <h4 className="text-primary fw-bold">
              ₹ {p.price.toLocaleString()}
            </h4>

            <button className="btn btn-outline-danger mt-4 px-4 py-2 rounded-pill">
              ❤️ Save Property
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyDetail;
