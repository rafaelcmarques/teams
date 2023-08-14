import { FlatList} from 'react-native';
import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect} from '@react-navigation/native';

import { groupsGetAll } from '@storage/group/groupGetAll';

import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  
  async function fetchGroups() {
    try {
      const data = await groupsGetAll()
      setGroups(data)
    } catch(error){
      console.log(error)
    }
  }

  const navigation = useNavigation()
  
  function handleNewGroup() {
    navigation.navigate('new')
  }

  function handleOpenGroup(group:string) {
    navigation.navigate('players', {group})
  }

  useFocusEffect(useCallback(()=>{
    fetchGroups();
  }, []))

  return (
    <Container> 
      <Header  />
      <Highlight 
        title='Turmas' 
        subtitle='Jogue com sua turma'
      />

      <FlatList
        data={groups}
        keyExtractor={(item)=> item}
        renderItem={({item})=>(
          <GroupCard
            title={item}
            onPress={()=>handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        ListEmptyComponent={
          ()=> (
            <ListEmpty message='Que tal cadastrar a primeira turma?'/>
          )
        }
      />

      <Button 
        title='Adicionar turma'   
        onPress={handleNewGroup}
      />
    </Container>
  );
}

