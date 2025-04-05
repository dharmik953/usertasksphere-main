import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256' }); // Line 4
};


export default generateToken;