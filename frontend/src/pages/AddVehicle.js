import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState(null);
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files); // Set selected files in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Appending files to formData
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
    }

    // Append other form fields to formData
    formData.append("make", make);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);

    try {
      // Make the POST request to the backend
      const response = await axios.post("http://localhost:8080/api/v1/car/create-car", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Check if the response status is 200, indicating success
      if (response.status === 200) {
        console.log("Vehicle added successfully:", response.data);
        navigate("/adminDashboard"); // Navigate to Admin Dashboard after successful submission
      } else {
        console.log("Failed to add vehicle:", response.data);
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Make"
          className="form-control"
          onChange={(e) => setMake(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Model"
          className="form-control my-2"
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          className="form-control my-2"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Year"
          className="form-control my-2"
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="form-control my-2"
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="form-control my-2"
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="form-control my-2"
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="form-control my-2"
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
