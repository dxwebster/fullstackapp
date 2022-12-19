import React, { useState, useEffect, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import Button from '../../components/Button';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
  ProviderContainer,
  ExitButton,
  ProviderInfo,
  ProviderName,
  ProviderMetaText,
  ExitDialog,
  MaskDialog,
  ButtonsContainer,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [showBox, setShowBox] = useState(false);
  const navigation = useNavigation();
  const [registeredUsers, setRegisteredUsers] = useState<Provider[]>([]);

  useEffect(() => {
    api.get('users').then((response) => {
      setRegisteredUsers(response.data);
    });
  }, []);

  const handleSelectProvider = useCallback(
    (providerId: string) => {
      navigation.navigate('UserInfo', { providerId });
    },
    [navigation],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,{' '}
          <UserName onPress={() => navigation.navigate('Profile')}>
            {user.name}
          </UserName>
          {'\n'}
          <ExitButton onPress={() => setShowBox(true)}>Sair</ExitButton>
        </HeaderTitle>

        <ProfileButton>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      {showBox && (
        <MaskDialog>
          <ExitDialog>
            <Text>Tem certeza que deseja sair?</Text>
            <ButtonsContainer>
              <Button style={{ marginRight: 10 }} onPress={() => signOut()}>
                Sim
              </Button>
              <Button onPress={() => setShowBox(false)}>Não</Button>
            </ButtonsContainer>
          </ExitDialog>
        </MaskDialog>
      )}

      <ProvidersList
        data={registeredUsers}
        keyExtractor={(registeredUser) => registeredUser.id}
        ListHeaderComponent={
          <ProvidersListTitle>Usuários Cadastrados</ProvidersListTitle>
        }
        renderItem={({ item: registeredUser }) => (
          <ProviderContainer
            onPress={() => handleSelectProvider(registeredUser.id)}
          >
            <ProviderInfo>
              <ProviderName>{registeredUser.name}</ProviderName>
              <ProviderMetaText>{registeredUser.email}</ProviderMetaText>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
