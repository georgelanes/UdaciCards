import {RECEIVE_DECKS, ADD_DECK,ADD_CARD } from '../actions'


function reducer(state={}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
            break
        case ADD_DECK:
            return {                
                ...state,
                [action.title]:{
                    title:action.title,
                    questions:[]
                }
            }
            break
        case ADD_CARD: {
            const deck = {
                ...state
            }
            if (deck[action.title]) {
                const {question, answer} = action.card
                deck[action.title].questions.push({question, answer})
            }
            return deck
            break;
        }
        default:
            return state
    }
}

export default reducer