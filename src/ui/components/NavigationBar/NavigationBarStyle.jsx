import styled from 'styled-components/native';

export const NavContainer = styled.View`
  background-color: #575757;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 90px;
  z-index: 1;
  padding: 20px;
  padding-bottom: 30px;
  border-radius: 20px;
  align-items: center;
`;

export const ButtonIcon = styled.TouchableOpacity`
  justify-content: center;
  gap: 5px;
  align-items: center;
`;


export const TextIcon = styled.Text`
  color: white;
  font-size: 12px;
`;
