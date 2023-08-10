import { FlatList} from 'react-native';
import { useState } from 'react';
import { useNavigation} from '@react-navigation/native';

import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])

  const navigation = useNavigation()
  
  function handleNewGroup() {
    navigation.navigate('new')
  }

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

