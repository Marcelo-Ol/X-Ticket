import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Modal, TextInput, Button, Alert } from 'react-native';
import styled from 'styled-components';
import QRCode from 'react-native-qrcode-svg';
import LogoBranca from '../assets/logo_branca.png';
import { captureScreen } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';

export default function Ticket({ navigation, route }) {
  const { username, saldo, ticketValue } = route.params;
  const [ticketInputValue, setTicketInputValue] = useState('');
  const [ticketModalVisible, setTicketModalVisible] = useState(false);
  const windowHeight = Dimensions.get('window').height;

  const handleTicketConfirmar = () => {
    const valor = parseFloat(ticketInputValue);
    if (!isNaN(valor) && valor > 0) {
      if (valor > saldo) {
        Alert.alert('Saldo insuficiente', 'Você não tem saldo suficiente para gerar este ticket.');
      } else {
        navigation.navigate('Ticket', { username, saldo: saldo - valor, ticketValue: valor });
        setTicketModalVisible(false);
        setTicketInputValue('');
      }
    } else {
      Alert.alert('Valor inválido', 'Por favor, insira um número válido.');
    }
  };

  const takeScreenshot = async() => {
    try{
      const uri = await captureScreen({
        format: 'png',
        quality: 0.8,
      });
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if ((status) === 'granted'){
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert('Screenshot', 'O ticket foi salvo na galeria!');
      }else{
        Alert.alert('Permissão negada', 'Não foi possível salvar a imagem, permissão negada.');
      }
    } catch (error){
      Alert.alert('Erro', 'Não foi possível tirar a screenshot: ' + error.message);
    }
  };

  return (
    <Container style={{ height: windowHeight }}>
      <HeaderContainer>
        <Logo source={LogoBranca} />
        <HeaderText>X-Ticket</HeaderText>
      </HeaderContainer>

      <ProfileInfo>
        <ProfilePicture source={require('../assets/profile.png')} />
        <HeaderText>{username}</HeaderText>
        <SaldoHeader>Saldo: R$ {saldo.toFixed(2)}</SaldoHeader>
      </ProfileInfo>

      <ButtonContainer>
        <ActionButton onPress={() => navigation.goBack()}>
          <ButtonText>Voltar</ButtonText>
        </ActionButton>
        <ActionButton onPress={() => setTicketModalVisible(true)}>
          <ButtonText>Outro Ticket</ButtonText>
        </ActionButton>
      </ButtonContainer>

      <ScreenshotButton onPress={takeScreenshot}>
        <ButtonText>Salvar Ticket na galeria</ButtonText>
      </ScreenshotButton>

      <TicketValueContainer>
        <TicketText>Valor:</TicketText>
        <TicketValueText>R$ {ticketValue.toFixed(2)}</TicketValueText>
      </TicketValueContainer>

      <QRCodeContainer>
        <QRCode
          value={`Ticket de R$ ${ticketValue.toFixed(2)}`}
          size={200}
          color="black"
          backgroundColor="white"
        />
      </QRCodeContainer>

      <Modal
        transparent={true}
        animationType="slide"
        visible={ticketModalVisible}
        onRequestClose={() => setTicketModalVisible(false)}
      >
        <ModalContainer>
          <ModalContent>
            <Text>Insira o valor do novo ticket:</Text>
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
  background-color: #f5f5f5;
`;

const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px; 
  margin-bottom: 10px; 
`;

const ProfileInfo = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; 
`;

const ProfilePicture = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-top: 10px;
`;

const HeaderText = styled(Text)`
  font-size: 38px;
  font-weight: bold;
  color: #333;
  margin-left: 10px;
`;

const Logo = styled(Image)`
  width: 80px;
  height: 80px;
`;

const SaldoHeader = styled(Text)`
  font-size: 18px;
  color: #666;
  margin-top: 10px;
`;

const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const ActionButton = styled(TouchableOpacity)`
  background-color: #4CAF50;
  padding: 15px;
  margin: 5px;
  border-radius: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ScreenshotButton = styled(TouchableOpacity)`
  background-color: #4CAF50;
  padding: 15px; 
  margin: 5px 0; 
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 100%; 
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const TicketValueContainer = styled(View)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const TicketText = styled(Text)`
  font-size: 40px;
  font-weight: bold;
`;

const TicketValueText = styled(Text)`
  font-size: 80px;
  font-weight: bold;
  color: green;
`;

const QRCodeContainer = styled(View)`
  align-items: center;
  margin-bottom: 20px; 
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
