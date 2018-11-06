export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
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

export function answerQuestion (result, decktitle) {
  return {
    type: ANSWER_QUESTION,
    result,
    decktitle
  }
}

export function addQuestion (question, title) {
  return {
    type: ADD_QUESTION,
    question
  }
}
