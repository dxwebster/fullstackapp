const SECRET_JWT = 'secret_jwt_123';

export default {
  jwt: {
    // secret: process.env.APP_SECRET || 'default',
    secret: SECRET_JWT || 'default',
    expiresIn: '1d',
  },
};
