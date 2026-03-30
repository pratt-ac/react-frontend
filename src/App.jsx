import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import CityProperties from "./CityProperties";
import PropertyDetail from "./PropertyDetail";
import Landing from "./Landing";
import Saved from "./saved";
import PropertyFull from "./PropertyFull";


function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route
        path="/login"
        element={token ? <Navigate to="/account" /> : <Login />}
      />

      <Route
        path="/register"
        element={token ? <Navigate to="/account" /> : <Register />}
      />

      <Route
        path="/account"
        element={token ? <Account /> : <Navigate to="/login" />}
      />
      <Route
        path="/saved" 
        element={<Saved />} />



      {/* PUBLIC */}
      <Route path="/properties/:city" element={<CityProperties />} />
      <Route path="/properties/:city/:id" element={<PropertyDetail />} />


      <Route path="/property/:id" element={<PropertyFull />} />


    </Routes>
  );
}

export default App;
