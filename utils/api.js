import { AsyncStorage } from 'react-native';
const DECK_STORAGE_KEY='DECK_STORAGE_KEY'

export function saveDeckTitle({title}){
    const newDeck = {
      [title]: {
        title: title,
        questions:[]
      }
    }   
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeck))
}

export function getDecks() {
    const listOfDecks = AsyncStorage.getItem(DECK_STORAGE_KEY).then((response) => { 
      return JSON.parse(response)  || []; 
    })
    .then((parsedResponse) => { 
      return parsedResponse 
    }); 

  return listOfDecks
}

export function addCardToDeck(title, card){
  
  getDecks().then((data) => {

    const deck = data[title]
    deck.questions.push(card)
    data[title] = deck

    return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
  })
}