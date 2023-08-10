import { useState } from "react";
import { FlatList } from "react-native";
import { Input } from "@components/Input";
import { Header } from "@components/Header";
import { Filter } from "@components/Filter";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export function Players(){
  const [team, setTeam] = useState<string>('TEAM A')
  const [players, setPlayers] = useState<string[]>([])

  return (
    <Container>
        <Header showBackButton/>
        <Highlight 
          title="Nome da turma" 
          subtitle="adicione a galera e separe os times"
        />

        <Form>
          <Input 
            placeholder="Nome da pessoa" 
            autoCorrect={false}
          />
          <ButtonIcon icon="add" type="PRIMARY"/>
        </Form>

        <HeaderList>
          <FlatList
            data={['TEAM A', 'TEAM B']}
            keyExtractor={item => item}
            renderItem={({item}) =>
              <Filter 
                title={item} 
                isActive = {item === team}
                onPress={()=>setTeam(item)}
              />
            }
            horizontal
          />
          <NumbersOfPlayers>
            {players.length}
          </NumbersOfPlayers>
        </HeaderList>

        <FlatList
          data={players}
          keyExtractor={item => item}
          renderItem={({item})=> 
            <PlayerCard 
              name={item}
              onRemove={()=> {}}
            />
          }
          ListEmptyComponent={ ()=> (
            <ListEmpty
              message="Não há pessoas cadastradas nesse time ainda."
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{paddingBottom: 100}, players.length === 0 && {flex: 1}]}
        />
         <Button title="Remover Turma" type="SECONDARY"/>
        
    </Container>
  )
}