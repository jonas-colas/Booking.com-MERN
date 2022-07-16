import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

//Create Room
export const Create = async (req, res, next) => {
  const hotelId = req.params.hotel_id;
  try {
    const room = await Room.create(req.body);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: room._id} });
    } catch (error) {
      next(error);
    }
    return res.status(201).json(room);  
  } catch (error) {
    next(error);
  }
};

//Get Rooms
export const Read = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

//Get One Hotel
export const GetOne = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//Update Hotel
export const Update = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//Destroy Hotel
export const Destroy = async (req, res, next) => {
  const hotelId = req.params.hotel_id;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id}});
    } catch (err) {
      next(err);
    }
    return res.status(200).json('This Room has been removed');
  } catch (error) {
    next(error);
  }
};
