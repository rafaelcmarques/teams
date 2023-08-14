import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Input } from "@components/Input";
import { Header } from "@components/Header";

import { Filter } from "@components/Filter";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";

import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

export function Players(){
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState<string>('TEAM A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const newPlayerNameInputRef = useRef<TextInput>(null)
  const navigation = useNavigation()

  type RouteParams = {
    group: string;
  }
  
  const route = useRoute()
  const {group} = route.params as RouteParams

  async function handleAddPlayer(){
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Nova pessoal', 'Informe o nome da pessoa para adicionar')
    }

     const newPlayer = {
      name: newPlayerName,
      team,
     }

     try {
      await playerAddByGroup(newPlayer,group)

      newPlayerNameInputRef.current?.blur()

      setNewPlayerName('')
      fetchPlayersByTeam()

     } catch(error){
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possivel adicionar')
      }
     }

  }

  async function fetchPlayersByTeam(){
    try{
      const playersByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playersByTeam)
    }catch(error){
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado')
    }
  }

  async function handlePlayerRemove(playerName: string){
    try{
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    }catch(error){
      console.log(error);
      Alert.alert('Remove pessoa', 'Não foi possivel remover essa pessoa.')
    }
  }

  async function groupRemove(){
    try {
      await groupRemoveByName(group)
      navigation.navigate("groups")
    
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Grupo', 'Não foi possivel remover o grupo.')
    }
  }

  async function handleGroupRemove(){
    Alert.alert(
      'Remover',
      'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel'},
        { text: 'Sim', onPress: ()=> {groupRemove()}}
      ]
    )
  }

  useEffect(()=> {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
        <Header showBackButton/>
        <Highlight 
          title={group} 
          subtitle="adicione a galera e separe os times"
        />

        <Form>
          <Input
            inputRef={newPlayerNameInputRef}
            onChangeText={text => setNewPlayerName(text)}
            value={newPlayerName}
            placeholder="Nome da pessoa" 
            autoCorrect={false}
            onSubmitEditing={handleAddPlayer}
            returnKeyType="done"
          />
          <ButtonIcon 
            icon="add" 
            type="PRIMARY"
            onPress={handleAddPlayer}
            />
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
          keyExtractor={item => item.name}
          renderItem={({item})=> 
            <PlayerCard 
              name={item.name}
              onRemove={()=> {handlePlayerRemove(item.name)}}
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
         <Button 
          title="Remover Turma" 
          type="SECONDARY" 
          onPress={handleGroupRemove}
        />
        
    </Container>
  )
}