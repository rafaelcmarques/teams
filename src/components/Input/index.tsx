import { TextInputProps } from "react-native";
import { Container } from "./styled";
import { useTheme } from "styled-components/native";

export function Input({...rest}:TextInputProps){
  const {COLORS} = useTheme()
  return(
    <Container
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  )
}