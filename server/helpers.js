import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = await req.cookies.tkey;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if(err) {
      return next(createError(403, "Token is invalid"));
    }
    req.user = user;
    next();
  })
}

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
      next();
    }else{
      if(err) {
        return next(createError(403, "You are not authorized"));
      }
    }
  });
}

export const isAdministrator = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if(req.user.isAdmin) {
      next();
    }else{
      if(err) {
        return next(createError(403, "You are not authorized"));
      }
    }
  });
}

export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

