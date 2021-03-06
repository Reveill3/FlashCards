export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const UPDATE_SCORE = 'UPDATE_SCORE'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function removeDeck (title) {
 return {
   type: REMOVE_DECK,
   title
 }
}

export function updateScore (score, decktitle) {
  return {
    type: UPDATE_SCORE,
    score,
    decktitle
  }
}

export function newQuestion (question, title) {
  return {
    type: ADD_QUESTION,
    question,
    title
  }
}
