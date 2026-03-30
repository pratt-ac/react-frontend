import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "./api";
import Navbar from "./Navbar";

function CityProperties() {
  const { city } = useParams();
  const [properties, setProperties] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [animatingId, setAnimatingId] = useState(null);

  useEffect(() => {
    api.get(`/api/properties?city=${city}`)
      .then(res => setProperties(res.data));
  }, [city]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.get("/api/saved")
        .then(res => {
          const ids = res.data.map(p => p.id);
          setSavedIds(ids);
        })
        .catch(() => {});
    }
  }, []);

  const toggleSave = (propertyId, e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    setAnimatingId(propertyId);

    if (savedIds.includes(propertyId)) {
      api.delete(`/api/saved/${propertyId}`).then(() => {
        setSavedIds(savedIds.filter(id => id !== propertyId));
      });
    } else {
      api.post(`/api/saved/${propertyId}`).then(() => {
        setSavedIds([...savedIds, propertyId]);
      });
    }

    setTimeout(() => {
      setAnimatingId(null);
    }, 200);
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        <h3 className="mb-4">Properties in {city}</h3>

        <div className="row g-4">
          {properties.map(p => (
            <div key={p.id} className="col-md-4">
              <div
                className="card h-100 shadow-sm rounded-4 overflow-hidden position-relative"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.location.href = `/property/${p.id}`
                }
              >
                {/* Bookmark icon */}
                <div
                  className="save-icon"
                  onClick={(e) => toggleSave(p.id, e)}
                >
                  <i
                    className={`
                      ${
                        savedIds.includes(p.id)
                          ? "bi bi-bookmark-fill"
                          : "bi bi-bookmark"
                      }
                      ${animatingId === p.id ? "pop-animate" : ""}
                    `}
                  ></i>
                </div>

                <img
                  src={p.thumbnail}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
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

export default CityProperties;
