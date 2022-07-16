import User from '../models/User.js';


//Get Users
export const Read = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//Get One User
export const GetOne = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//Update User
export const Update = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}; 


//Destroy User
export const Destroy = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json('This Hotel has been removed');
  } catch (error) {
    next(error);
  }
};
