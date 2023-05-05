import Cars from "../models/carsModel.js";
import asyncHandler from "express-async-handler";
import upload from "../utils/multer.js"; // import the multer instance
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";
//@des   fetch all cars
//@route GET/api/cars
//@access Public
const getCars = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const category = req.query.category ? { category: req.query.category } : {};

  const cars = await Cars.find({ ...keyword, ...category }).sort({ category: 1 });
  res.json(cars);
});

//@des   fetch single car
//@route GET/api/car
//@access Public
const getCarById = asyncHandler(async (req, res) => {
  const car = await Cars.findById(req.params.id).populate('reservation_id');
  if (car) {
    res.json(car);
  } else {
    throw new Error("Car not found");
  }
});

//@desc  Create a new car
//@route POST /api/cars

//@access Private

const createCar = asyncHandler(async (req, res) => {
  upload.single("image")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log(err);
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log(err);
      return res.status(500).json({ error: err.message });
    }

    // Everything went fine.
    // Continue with your route handler.
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      // Create new Car
      let car = new Cars({
        name: req.body.name,
        year: req.body.year,
        stock:req.body.stock,
        features:req.body.features,
        mileage:req.body.mileage,
        price:req.body.price, 
        category: req.body.category,
        description: req.body.description,
        public_id: result.public_id,
        url: result.secure_url,
      });
      // save car details in mongodb
      await car.save();
      res.status(200).json({ message: "Car created successfully!", car });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });
});

//@desc   Update a car
//@route  PUT /api/cars/:id
//@access Private/Admin
const updateCar = asyncHandler(async (req, res) => {
  try {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      } else {
        const { name, stock, year, mileage,price,features, category, description } = req.body;
        const car = await Cars.findById(req.params.id);

        if (!car) {
          res.status(404);
          throw new Error("Car not found");
        }

        // Update car properties
        car.name = name || car.name;
        car.stock = stock || car.stock;
        car.mileage = mileage || car.mileage;
        car.price = price || car.price;
        car.features = features || car.features;
        car.year = year || car.year;
        car.category = category || car.category;
        car.description = description || car.description;

        if (req.file) {
          // Delete old image from Cloudinary
          await cloudinary.uploader.destroy(car.public_id);

          // Upload new image to Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Cars",
          });

          car.public_id = result.public_id;
          car.url = result.secure_url;
        }

        const updatedCar = await car.save();
        res.json(updatedCar);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//@desc   Delete a car
//@route  DELETE /api/cars/:id
//@access Private/Admin
const deleteCar = asyncHandler(async (req, res) => {
  const carId = req.params.id;

  const car = await Cars.findById(carId);
  if (!car) {
    res.status(404);
    throw new Error("Car not found");
  }

  // Delete image from Cloudinary
  await cloudinary.uploader.destroy(car.public_id);

  // Delete car from database
  await Cars.deleteOne({ _id: carId });

  res.json({ message: "Car removed" });
});

export { getCars, getCarById, createCar, deleteCar, updateCar };
