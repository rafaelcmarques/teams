import { Container, Content, Logo } from "./styles";
import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Input } from "@components/Input"; 
import { Highlight } from "@components/Highlight";

export function NewGroup(){
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
        />
        <Button 
          title="Criar"
          style={{marginTop: 20}}  
        />
      </Content>
    </Container>
  )
}