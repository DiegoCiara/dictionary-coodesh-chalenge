import styled from 'styled-components/native';

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #0069fc;
  padding: 10px;
  width: 150px;
  border-radius: 5px;
  align-items: center;
`;
export const ButtonOutlined = styled.TouchableOpacity`
  border: 1px solid #0069fc;
  background-color: transparent;
  padding: 10px;  
  width: 150px;
  border-radius: 5px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: rgb(255, 255, 255);
  font-size: 16px;
`;
export const ButtonOutlinedText = styled.Text`
  color: #0069fc;
  font-size: 16px; 

`;
