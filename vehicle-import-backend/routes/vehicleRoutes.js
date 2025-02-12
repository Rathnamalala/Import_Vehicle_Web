const express = require('express');
const {
  getVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Public routes
router.get('/', getVehicles);
router.get('/:id', getVehicleById);

// Admin routes (protected)
router.post('/', authMiddleware, addVehicle);
router.put('/:id', authMiddleware, updateVehicle);
router.delete('/:id', authMiddleware, deleteVehicle);

module.exports = router;
