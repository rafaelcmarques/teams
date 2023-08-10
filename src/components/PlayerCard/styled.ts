import styled, {css} from "styled-components/native";
import {MaterialIcons} from '@expo/vector-icons'


export const Container = styled.View`
  width: 100%;
  height: 64px;
  background-color: ${({theme})=> theme.COLORS.GRAY_500};
  border-radius: 6px;


  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;

`

export const Name = styled.Text`
  ${({theme})=> css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.LG}px;
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  flex: 1;
`

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100,
  size: 32
}))`
  margin: 0 12px ;
`;