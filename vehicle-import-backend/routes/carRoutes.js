import express from "express";
import {
 
  createCarController,
  deleteCarController,
  getCarController,
  getSingleCarController,
  carCategoryController,
  carCountController,
  carFiltersController,
  carListController,
  carPhotoController,
  realtedCarController,
  searchCarController,
  updateCarController,
} from "../controllers/carController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-car",
  requireSignIn,
  isAdmin,
  formidable(),
  createCarController
);
//routes
router.put(
  "/update-car/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateCarController
);

//get products
router.get("/get-car", getCarController);

//single product
router.get("/get-car/:slug", getSingleCarController);

//get photo
router.get("/car-photo/:pid", carPhotoController);

//delete rproduct
router.delete("/delete-car/:pid", deleteCarController);

//filter product
router.post("/car-filters", carFiltersController);

//product count
router.get("/car-count", carCountController);

//product per page
router.get("/car-list/:page", carListController);

//search product
router.get("/search/:keyword", searchCarController);

//similar product
router.get("/related-car/:pid/:cid", realtedCarController);

//category wise product
router.get("/car-category/:slug", carCategoryController);



export default router;
