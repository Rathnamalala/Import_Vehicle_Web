import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/vehicles")
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Vehicles</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle._id}>
            <Link to={`/vehicles/${vehicle._id}`}>{vehicle.make} {vehicle.model}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
