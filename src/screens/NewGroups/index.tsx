import { useState } from "react";
import { Alert } from "react-native";
import {useNavigation} from "@react-navigation/native"

import { Container, Content, Logo } from "./styles";

import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input"; 
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";

export function NewGroup(){
  const [group, setGroup] = useState<string>('')

  const navigation = useNavigation()


  async function handleNew(){
    try {
      if(group.trim().length === 0){
        return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
      }

      await groupCreate(group)
      navigation.navigate('players', {group})
    }catch(error){
      if(error instanceof AppError){
        Alert.alert(error.message)
      }else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo')
        console.log(error)
      }
    }
  }
  return(
    <Container>
      <Header showBackButton/>
      <Content>
        <Logo/>
        <Highlight 
          title="Nova turma" 
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Input
          placeholder="Nome da turma"
          onChangeText={text => setGroup(text)}
        />
        <Button 
          title="Criar"
          style={{marginTop: 20}}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}