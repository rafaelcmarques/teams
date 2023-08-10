import { ButtonIcon } from "@components/ButtonIcon";
import { Container, Name, Icon } from "./styled";

type Props = {
  name: string,
  onRemove: ()=>void,
}
export function PlayerCard({name, onRemove }:Props){
  return (
    <Container>
      <Icon 
      name='person'
      />
      <Name>
        {name}
      </Name>
      <ButtonIcon 
        icon="close" 
        type="SECONDERY"
        onPress={onRemove}
      />
    </Container>
  )
}