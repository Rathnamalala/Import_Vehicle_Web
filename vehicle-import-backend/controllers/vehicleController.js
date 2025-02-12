const Vehicle = require('../models/Vehicle');

// Get all vehicles (with optional filtering)
exports.getVehicles = async (req, res) => {
  const { make, model, category } = req.query;
  try {
    let query = {};
    if (make) query.make = make;
    if (model) query.model = model;
    if (category) query.category = category;

    const vehicles = await Vehicle.find(query);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new vehicle (Admin only)
exports.addVehicle = async (req, res) => {
  try {
    const { make, model, year, price, description, category, image } = req.body;
    const newVehicle = new Vehicle({
      make, model, year, price, description, category, image,
      createdBy: req.user.userId,
    });

    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update vehicle (Admin only)
exports.updateVehicle = async (req, res) => {
  try {
    const { make, model, year, price, description, category, image } = req.body;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { make, model, year, price, description, category, image },
      { new: true }
    );

    if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(updatedVehicle);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete vehicle (Admin only)
exports.deleteVehicle = async (req, res) => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });

    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
