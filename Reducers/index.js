import { RECEIVE_DECKS, ADD_DECK, ANSWER_QUESTION, REMOVE_DECK, ADD_QUESTION } from '../Actions/index'

function Decks (state={}, action) {
  switch(action.type) {
    
    case RECEIVE_DECKS:
      return decks
    
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: deck
      }

    case REMOVE_DECK:
      const newKeys = Object.keys(state).slice(0, action.index).concat(Object.keys(state).slice(index + 1))
      const newDecks = {}
      newKeys.forEach(key => newDecks[key] = state[key])
      return newDecks
    
    case ADD_QUESTION:
      editedDeck = state[title]
      editedDeck.questions.push(action.question)
      return {
        ...state,
        [title]: editedDeck
      }

    case ANSWER_QUESTION:
      if (action.result === 'correct'){
      return {
        ...state,
        [action.title]: {...state[action.title], prevScore: state[action.title].prevScore + 1}
      }}
      else {
        return {...state}
      }


    default:
      return state
  }
}

export default Decks