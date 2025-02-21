import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AddCircle, CarRepair, Category as CategoryIcon } from '@mui/icons-material';
import axios from 'axios';

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [cars, setCars] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCarModal, setShowCarModal] = useState(false);

  // Fetch categories and cars data from the API
  useEffect(() => {
    fetchCategories();
    fetchCars();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars", error);
    }
  };

  const handleAddCategory = (category) => {
    if (category.name) {
      // Call API to add category
      axios.post("http://localhost:8080/api/categories", category)
        .then(() => fetchCategories())
        .catch((error) => console.error("Error adding category", error));
    } else {
      alert("Category name cannot be empty.");
    }
  };

  const handleAddCar = (car) => {
    if (car.model && car.category) {
      // Call API to add car
      axios.post("http://localhost:8080/api/cars", car)
        .then(() => fetchCars())
        .catch((error) => console.error("Error adding car", error));
    } else {
      alert("Both car model and category must be provided.");
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h3>Admin Panel</h3>
        </div>
        <ul className="sidebar-links">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="#" onClick={() => setShowCategoryModal(true)}><CategoryIcon /> Manage Categories</Link></li>
          <li><Link to="#" onClick={() => setShowCarModal(true)}><CarRepair /> Manage Cars</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <h2>Manage Categories</h2>
        <button onClick={() => setShowCategoryModal(true)} className="btn btn-primary"><AddCircle /> Add Category</button>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Manage Cars</h2>
        <button onClick={() => setShowCarModal(true)} className="btn btn-primary"><AddCircle /> Add Car</button>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.model}</td>
                <td>{car.category}</td>
                <td>
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Category */}
      {showCategoryModal && (
        <CategoryModal
          closeModal={() => setShowCategoryModal(false)}
          onSubmit={handleAddCategory}
        />
      )}

      {/* Modal for Adding Car */}
      {showCarModal && (
        <CarModal
          closeModal={() => setShowCarModal(false)}
          onSubmit={handleAddCar}
        />
      )}
    </div>
  );
};

const CategoryModal = ({ closeModal, onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");  // Declare state for categoryName

  const handleSubmit = () => {
    onSubmit({ name: categoryName });
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Add Category</h4>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)} // Update categoryName on change
        />
        <button onClick={handleSubmit}>Add Category</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

const CarModal = ({ closeModal, onSubmit }) => {
  const [carModel, setCarModel] = useState("");
  const [carCategory, setCarCategory] = useState("");

  const handleSubmit = () => {
    onSubmit({ model: carModel, category: carCategory });
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Add Car</h4>
        <input
          type="text"
          placeholder="Car Model"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)} // Update carModel on change
        />
        <input
          type="text"
          placeholder="Category"
          value={carCategory}
          onChange={(e) => setCarCategory(e.target.value)} // Update carCategory on change
        />
        <button onClick={handleSubmit}>Add Car</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default AdminPanel;
