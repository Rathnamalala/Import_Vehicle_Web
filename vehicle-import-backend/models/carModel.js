import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category", // You may want to define a Category schema if it's not already defined
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    condition: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    
    slug: {
      type: String,
      required: true,
    },
    
   
  },
  { timestamps: true }
);

export default mongoose.model("Cars", carSchema);

