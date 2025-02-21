import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleList from "./pages/VehicleList";
import VehicleDetail from "./pages/VehicleDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AddVehicle from "./pages/AddVehicle";

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<VehicleList />} />
        <Route path="/vehicles/:id" element={<VehicleDetail />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddVehicle />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
