import Hotel from '../models/Hotel.js';

//Create Hotel
export const Create = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const saved = await newHotel.save();
    return res.status(201).json(saved);
  } catch (error) {
    next(error);
  }
};

//Get Hotels
export const Read = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    return res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

//Get One Hotel
export const GetOne = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    return res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//Update Hotel
export const Update = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    return res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};


//Destroy Hotel
export const Destroy = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    return res.status(200).json('This Hotel has been removed');
  } catch (error) {
    next(error);
  }
};
