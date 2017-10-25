import { AsyncStorage } from 'react-native';
const DECK_STORAGE_KEY='DECK_STORAGE_KEY'

function mockDecks() {
  return {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        }, {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

export function saveDeckTitle(title){
  getDecks().then((decks) => {
    if (!decks[title]) {
      decks[title] = {
        title: title,
        questions: []
      }
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    }
  })
}

export function getDecks() {
    const listOfDecks = AsyncStorage.getItem(DECK_STORAGE_KEY).then((response) => { 
      return JSON.parse(response)  || mockDecks(); 
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