import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, Alert, Modal, TextInput, Button } from 'react-native';
import styled from 'styled-components';
import LogoBranca from '../assets/logo_branca.png';

export default function Main({ navigation, route }) {
  const username = route.params.username || 'Usuário'; 
  const [saldo, setSaldo] = useState(0);  
  const [inputValue, setInputValue] = useState('');
  const [ticketInputValue, setTicketInputValue] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [ticketModalVisible, setTicketModalVisible] = useState(false); 

  const handleTicketPress = (valor) => {
    if (valor > saldo) {
      Alert.alert('Saldo insuficiente', 'Você não tem saldo suficiente para gerar este ticket.');
    } else {
      setSaldo(saldo - valor);
      navigation.navigate('Ticket', { username, saldo: saldo - valor, ticketValue: valor });
    }
  };

  const handleAdicionarDinheiro = () => {
    setModalVisible(true);
  };

  const handleConfirmar = () => {
    const valor = parseFloat(inputValue);
    if (!isNaN(valor) && valor > 0) {
      setSaldo(saldo + valor);
      setModalVisible(false);
      setInputValue('');
    } else {
      Alert.alert('Valor inválido', 'Por favor, insira um número válido.');
    }
  };

  const handleTicketConfirmar = () => {
    const valor = parseFloat(ticketInputValue);
    if (!isNaN(valor) && valor > 0) {
      if (valor > saldo) {
        Alert.alert('Saldo insuficiente', 'Você não tem saldo suficiente para gerar este ticket.');
      } else {
        setSaldo(saldo - valor);
        setTicketModalVisible(false);
        setTicketInputValue('');
        navigation.navigate('Ticket', { username, saldo: saldo - valor, ticketValue: valor });
      }
    } else {
      Alert.alert('Valor inválido', 'Por favor, insira um número válido.');
    }
  };

  return (
    <Container>
      <Header>
        <LogoContainer>
          <Logo source={LogoBranca} />
          <Title>X-Ticket</Title>
        </LogoContainer>
        <ProfilePicture source={require('../assets/profile.png')} />
      </Header>

      <HeaderText>Bem vindo, {username}</HeaderText>

      <Content>
        <SaldoSection>
          <SaldoText>Saldo:</SaldoText>
          <SaldoValor>R$ {saldo.toFixed(2)}</SaldoValor>
        </SaldoSection>

        <AdicionarDinheiroButton onPress={handleAdicionarDinheiro}>
          <ButtonText>Adicionar dinheiro</ButtonText>
        </AdicionarDinheiroButton>

        <SectionTitle>X-Ticket</SectionTitle>
        <ButtonGrid>
          <Row>
            <ActionButton onPress={() => handleTicketPress(10)}>
              <ButtonText>R$ 10,00</ButtonText>
            </ActionButton>
            <ActionButton onPress={() => handleTicketPress(20)}>
              <ButtonText>R$ 20,00</ButtonText>
            </ActionButton>
          </Row>
          <Row>
            <ActionButton onPress={() => handleTicketPress(50)}>
              <ButtonText>R$ 50,00</ButtonText>
            </ActionButton>
            <ActionButton onPress={() => setTicketModalVisible(true)}>
              <ButtonText>Outro valor</ButtonText>
            </ActionButton>
          </Row>
        </ButtonGrid>
      </Content>
      
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <Text>Insira a quantidade de dinheiro que quer adicionar:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, width: '100%', marginVertical: 20, fontSize: 18 }}
              keyboardType="numeric"
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Ex: 100.00"
            />
            <ButtonContainer>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
              <Button title="Confirmar" onPress={handleConfirmar} />
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>

      <Modal
        transparent={true}
        animationType="slide"
        visible={ticketModalVisible}
        onRequestClose={() => setTicketModalVisible(false)}>
        <ModalContainer>
          <ModalContent>
            <Text>Insira o valor do ticket:</Text>
            <TextInput
              style={{ borderBottomWidth: 1, width: '100%', marginVertical: 20, fontSize: 18 }}
              keyboardType="numeric"
              value={ticketInputValue}
              onChangeText={setTicketInputValue}
              placeholder="Ex: 15.00"
            />
            <ButtonContainer>
              <Button title="Cancelar" onPress={() => setTicketModalVisible(false)} color="red" />
              <Button title="Confirmar" onPress={handleTicketConfirmar} />
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
`;

const Header = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const LogoContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Logo = styled(Image)`
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;

const Title = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  color: #333;
`;

const HeaderText = styled(Text)`
  font-size: 36px;
  font-weight: bold;
  margin-top: 35px;
`;

const ProfilePicture = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 20px;
`;

const Content = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const SaldoSection = styled(View)`
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const SaldoText = styled(Text)`
  font-size: 40px;
  font-weight: bold;
`;

const SaldoValor = styled(Text)`
  font-size: 60px;
  color: green;
  font-weight: bold;
  margin-top: 10px;
`;

const SectionTitle = styled(Text)`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 40px;
`;

const ButtonGrid = styled(View)`
  width: 100%;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const AdicionarDinheiroButton = styled(TouchableOpacity)`
  background-color: #4CAF50;
  padding: 15px;
  margin-top: 20px;
  border-radius: 10px;
  width: 80%;
  align-items: center;
`;

const ActionButton = styled(TouchableOpacity)`
  background-color: #4CAF50;
  padding: 15px;
  margin: 5px;
  border-radius: 10px;
  width: 48%;
  align-items: center;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const ModalContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled(View)`
  width: 80%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;
