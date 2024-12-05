import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components';

export default function InitialScreen({ navigation }) { 
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim()) {
      navigation.navigate('Sua conta', { username });
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  return (
    <Container>
      <LogoContainer>
        <Logo source={require('../assets/Logo_verde.jpeg')} />
        <Title>X-Ticket</Title>
      </LogoContainer>
      <Input
        placeholder="Insira seu nome" 
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
      />
      <EnterButton onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </EnterButton>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  background-color: #2d672f;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled(View)`
  align-items: center;
  margin-bottom: 50px;
`;

const Logo = styled(Image)`
  width: 250px;
  height: 250px;
`;

const Title = styled(Text)`
  font-size: 40px;
  color: white;
  margin-top: 20px;
  font-weight: bold;
`;

const Input = styled(TextInput)`
  width: 80%;
  padding: 15px;
  margin: 20px 0;
  background-color: white;
  border-radius: 10px;
  font-size: 18px;
`;

const EnterButton = styled(TouchableOpacity)`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 80%;
  align-items: center;
`;

const ButtonText = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  color: #4caf50;
`;
