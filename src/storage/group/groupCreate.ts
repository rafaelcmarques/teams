import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppError } from "@utils/AppError";

import { GROUP_COLLECTION } from "@storage/storageConfig"
import { groupsGetAll } from "./groupGetAll";

export async function groupCreate(newGroup: string){
  try{
    const storedGroups = await groupsGetAll();
    const groupNameAlreadyExist = storedGroups.includes(newGroup)

    if(groupNameAlreadyExist) {
      throw new AppError('Já existe um grupo cadastrado com esse nome ')
    }

    const storage = JSON.stringify([...storedGroups, newGroup ])
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  }catch(error){
    throw error; 
  }
}