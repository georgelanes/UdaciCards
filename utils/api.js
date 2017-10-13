import { AsyncStorage } from 'react-native';
const DECK_STORAGE_KEY='DECK_STORAGE_KEY'

export function saveDeckTitle(title){
    const newDeck = {
      [title]: {
        title: title,
        questions:[]
      }
    }
    
    console.log(newDeck)
    
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))
}

export function getDecks() {
    
  console.log('funcion getDecks called....')

    const listOfDecks = AsyncStorage.getItem(DECK_STORAGE_KEY).then((response) => { 
      return JSON.parse(response)  || []; 
    })
    .then((parsedResponse) => { 
      return parsedResponse 
    }); 

  console.log('listOfDecks: ', listOfDecks)
  return listOfDecks
}