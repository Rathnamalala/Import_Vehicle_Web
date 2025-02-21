import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div>
      <h2>{vehicle.make} {vehicle.model}</h2>
      <p>Price: ${vehicle.price}</p>
      <p>{vehicle.description}</p>
    </div>
  );
};

export default VehicleDetail;
