import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 60px;
  background: #44c3c3;
  border-radius: 10px;
  margin-top: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-size: 18px;
`;
