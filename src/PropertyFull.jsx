import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import api from "./api";
import SiteVisitForm from "./SiteVisitForm";

function PropertyFull() {

  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [valuation, setValuation] = useState(null);
  const [loadingValuation, setLoadingValuation] = useState(false);

  useEffect(() => {

    api.get(`/api/properties/${id}`)
      .then(res => {
        setProperty(res.data);
      })
      .catch(err => {
        console.error("Property fetch failed:", err);
      });

  }, [id]);


  const evaluatePrice = async () => {

    try {

      setLoadingValuation(true);

      const res = await api.get(`/api/properties/fair-price/${property.id}`);

      setValuation(res.data);

    } catch (err) {

      console.error("Fair price evaluation failed:", err);
      alert("Could not evaluate price");

    } finally {

      setLoadingValuation(false);

    }

  };


  if (!property) {
    return (
      <>
        <Navbar />
        <div className="container py-5">
          Loading property...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container py-5">

        {/* Property Header */}
        <h2 className="mb-1">{property.name}</h2>

        <p className="text-muted">
          {property.locality}, {property.city}
        </p>


        {/* Image Gallery */}

        <div className="row mb-4">

          <div className="col-md-8">

            <img
              src={property.thumbnail_url || property.thumbnail}
              className="img-fluid rounded shadow-sm"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
            />

          </div>

          <div className="col-md-4 d-grid gap-3">

            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80"
              className="rounded"
              style={{ height: "125px", objectFit: "cover" }}
            />

            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80"
              className="rounded"
              style={{ height: "125px", objectFit: "cover" }}
            />

            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80"
              className="rounded"
              style={{ height: "125px", objectFit: "cover" }}
            />

          </div>

        </div>


        {/* Property Stats */}

        <div className="row mb-5">

          <div className="col-md-8">

            <div className="card p-4 shadow-sm rounded-4">

              <h4 className="mb-3">Property Details</h4>

              <div className="row">

                <div className="col-md-4">
                  <strong>{property.bhk}</strong>
                  <div className="text-muted">BHK</div>
                </div>

                <div className="col-md-4">
                  <strong>{property.sqft}</strong>
                  <div className="text-muted">Sqft</div>
                </div>

                <div className="col-md-4">
                  <strong>₹ {property.price.toLocaleString()}</strong>
                  <div className="text-muted">Price</div>
                </div>

              </div>

              <hr />

              <h5>Location</h5>

              <p className="text-muted">
                {property.locality}, {property.city}
              </p>

              <p>
                Coordinates: {property.latitude}, {property.longitude}
              </p>

            </div>


            {/* Fair Price Evaluator */}

            <div className="card p-4 shadow-sm rounded-4 mt-4">

              <h4 className="mb-3">Fair Price Evaluation</h4>

              <button
                className="btn btn-primary"
                onClick={evaluatePrice}
                disabled={loadingValuation}
              >
                {loadingValuation ? "Evaluating..." : "Evaluate Price"}
              </button>


              {valuation && (

                <div className="mt-4">

                  <p>
                    Comparable Properties:
                    <strong> {valuation.comparable_properties}</strong>
                  </p>

                  <p>
                    Expected Market Price:
                    <strong> ₹ {valuation.expected_price.toLocaleString()}</strong>
                  </p>

                  <p>
                    Actual Price:
                    <strong> ₹ {valuation.actual_price.toLocaleString()}</strong>
                  </p>

                  <p>
                    Difference:
                    <strong> {valuation.difference_percent}%</strong>
                  </p>


                  <span
                    className={
                      valuation.verdict === "Underpriced"
                        ? "badge bg-success"
                        : valuation.verdict === "Overpriced"
                        ? "badge bg-danger"
                        : "badge bg-warning text-dark"
                    }
                    style={{ fontSize: "1rem", padding: "8px 12px" }}
                  >
                    {valuation.verdict}
                  </span>

                </div>

              )}

            </div>

          </div>


          {/* Right column */}

          <div className="col-md-4">

            <SiteVisitForm property={property} />

          </div>

        </div>

      </div>
    </>
  );
}

export default PropertyFull;