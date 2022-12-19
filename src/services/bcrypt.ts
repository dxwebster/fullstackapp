import ReactNativeBcrypt from 'react-native-bcrypt';

async function generateHash(payload: string): Promise<string> {
  return ReactNativeBcrypt.hashSync(payload, 8);
}

async function compareHash(payload: string, hashed: string): Promise<boolean> {
  return ReactNativeBcrypt.compareSync(payload, hashed);
}
