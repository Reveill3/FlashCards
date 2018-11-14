import { RECEIVE_DECKS, ADD_DECK, UPDATE_SCORE, REMOVE_DECK, ADD_QUESTION } from '../Actions/index'

function Decks (state={}, action) {
  switch(action.type) {

    case RECEIVE_DECKS:
      return {...action.decks}

    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }

    case REMOVE_DECK:{
      const deleteIndex = Object.keys(state).indexOf(action.title)
      let newKeys = Object.keys(state).slice(0, deleteIndex).concat(Object.keys(state).slice(deleteIndex + 1))
      let newDecks = {}
      newKeys.forEach(key => newDecks[key] = state[key])
      return newDecks}

    case ADD_QUESTION:{
      let editedDeck = state[action.title]
      editedDeck.questions.push(action.question)
      return {
        ...state,
        [action.title]: editedDeck
      }}

    case UPDATE_SCORE:{
      return {
        ...state,
        [action.decktitle]: {...state[action.decktitle], prevScore: action.score
      }}}

    default:
      return state
  }
}

export default Decks
