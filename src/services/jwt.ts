import jwt from 'jsonwebtoken';

const SECRET_KEY = '123456789';
const expiresIn = '1h';

// Create a token from a payload
export function createToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
// function verifyToken(token: string) {
//   return jwt.verify(token, SECRET_KEY, (err, decode) =>
//     decode !== undefined ? decode : err,
//   );
// }
