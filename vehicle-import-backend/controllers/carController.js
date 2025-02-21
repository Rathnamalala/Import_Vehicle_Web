import carModel from "../models/carModel.js";
import categoryModel from "../models/categoryModel.js";

import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createCarController = async (req, res) => {
  try {
    const { name, model, year, mileage, price, category, condition, transmission, color, description,phone,address  } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !model:
        return res.status(500).send({ error: "Model is required" });
      case !year:
        return res.status(500).send({ error: "Year is required" });
      case !mileage:
        return res.status(500).send({ error: "Mileage is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !condition:
        return res.status(500).send({ error: "Condition is required" });
      case !transmission:
        return res.status(500).send({ error: "Transmission is required" });
      case !color:
        return res.status(500).send({ error: "Color is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !phone:
        return res.status(500).send({ error: "Phone Number is required" });
      case !address:
        return res.status(500).send({ error: "Address is required" });  
      case photo && photo.size > 1000000:
        return res.status(500).send({ error: "Photo is required and should be less than 10MB" });
    }

    const cars = new carModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      cars.photo.data = fs.readFileSync(photo.path);
      cars.photo.contentType = photo.type;
    }

    await cars.save();

    res.status(201).send({
      success: true,
      message: "Car created successfully",
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating car",
    });
  }
};

//get all cars
export const getCarController = async (req, res) => {
  try {
    const cars = await carModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: cars.length,
      message: "All cars ",
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting cars",
      error: error.message,
    });
  }
};
// get single product
export const getSingleCarController = async (req, res) => {
  try {
    const car = await carModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const carPhotoController = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.pid).select("photo");
    if (car.photo.data) {
      res.set("Content-type", car.photo.contentType);
      return res.status(200).send(car.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteCarController = async (req, res) => {
  try {
    await carModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const updateCarController = async (req, res) => {
  try {
    const { name, model, year, price, category, condition, transmission, color, description } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !model:
        return res.status(500).send({ error: "Model is required" });
      case !year:
        return res.status(500).send({ error: "Year is required" });
      
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
      case !condition:
        return res.status(500).send({ error: "Condition is required" });
      case !transmission:
        return res.status(500).send({ error: "Transmission is required" });
      case !color:
        return res.status(500).send({ error: "Color is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
    
      case photo && photo.size > 10000000:
        return res.status(500).send({ error: "Photo is required and should be less than 10MB" });
    }

    const updatedCar = await carModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      updatedCar.photo.data = fs.readFileSync(photo.path);
      updatedCar.photo.contentType = photo.type;
    }

    await updatedCar.save();

    res.status(200).send({
      success: true,
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating car",
    });
  }
};

// filters
export const carFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const cars = await carModel.find(args);
    res.status(200).send({
      success: true,
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const carCountController = async (req, res) => {
  try {
    const total = await carModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const carListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const cars = await carModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchCarController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await carModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Car API",
      error,
    });
  }
};

// similar products
export const realtedCarController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const cars = await carModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const carCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const cars = await carModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


