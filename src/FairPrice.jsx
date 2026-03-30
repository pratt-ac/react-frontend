import { useState } from "react";

function FairPrice({ property }) {

  const [result, setResult] = useState(null);

  const evaluate = () => {

    const pricePerSqft = property.price / property.sqft;

    const cityAverage = {
      Bangalore: 8000,
      Chennai: 7000,
      Delhi: 9000,
      Hyderabad: 7500,
      Mumbai: 15000
    };

    const avg = cityAverage[property.city] || 8000;

    if (pricePerSqft < avg * 0.9) {
      setResult("Underpriced — Good Deal");
    } else if (pricePerSqft > avg * 1.1) {
      setResult("Overpriced — Negotiate");
    } else {
      setResult("Fair Market Price");
    }
  };

  return (

    <div className="card p-4 mt-4 shadow-sm rounded-4">

      <h4 className="mb-3">Fair Price Evaluator</h4>

      <p>
        Estimate whether this property is fairly priced based on
        price per square foot.
      </p>

      <button
        className="btn btn-primary"
        onClick={evaluate}
      >
        Evaluate Price
      </button>

      {result && (
        <div className="alert alert-info mt-3">
          {result}
        </div>
      )}

    </div>

  );
}

export default FairPrice;