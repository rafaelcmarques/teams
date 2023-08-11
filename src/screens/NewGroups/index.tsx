import { useState } from "react";
import {useNavigation} from "@react-navigation/native"

import { Container, Content, Logo } from "./styles";

import { Highlight } from "@components/Highlight";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input"; 

export function NewGroup(){
  const [group, setGroup] = useState<string>('')

  const navigation = useNavigation()


  function handleNew(){
    navigation.navigate('players', {group})
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