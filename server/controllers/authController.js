import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { createError } from '../helpers.js';
import jwt from 'jsonwebtoken';

export const Register = async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;
  if (!username || !email || !password) {
    return res.status(404).json({ error: 'All Fields are required' });
  }
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json('User already exists');
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hash,
      isAdmin,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(createError(404, 'All Fields are required'));
  }
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return next(createError(404, 'User does not exist'));
  }
  try {
    const isValidPass = await bcrypt.compare(password, checkUser.password);
    if (!isValidPass) {
      return next(createError(400, 'Invalid credentials'));
    }

    const { password: salt, isAdmin, ...user } = checkUser._doc;
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.SECRET
    );
    res
      .cookie('tkey', token, { expire: '30d', httpOnly: true }) //expire: '30d' expiresIn: 9999
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};
