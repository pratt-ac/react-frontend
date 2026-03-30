import { useEffect, useState } from "react";
import api from "./api";
import { Link } from "react-router-dom";

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    api.get("/api/properties")
      .then(res => setProperties(res.data))
      .catch(() => alert("Failed to load properties"));
  }, []);

  return (
    <div>
      <h2>Properties</h2>
      <ul>
        {properties.map(p => (
          <li key={p.id}>
            <Link to={`/properties/${p.id}`}>
              {p.title || `Property ${p.id}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Properties;
