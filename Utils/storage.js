import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'FlashCards:Decks'

export function loadData () {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    JSON.parse(results)
    return results
  })
}

export function addDeck (title) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(
    [title]: {
    title: title, 
    questions: [],
    prevScore: 0
  }))
}

export function addQuestion (title, question) {
  AsyncStorage.getItem(STORAGE_KEY).then(
    (results) => {
      const data = JSON.parse(results)
      AsyncStorage.mergeItem(STORAGE_KEY, 
      JSON.stringify({
        [title]: {...data[title], 
          questions: [...data[title]                       .questions, question]
        }
      })
      )
    }
  )
}

export function answerQuestion (title, result) {
  if ( result === 'correct' ){
  AsyncStorage.getItem(STORAGE_KEY).then(
    (results) => {
      const data = JSON.parse(results)
      AsyncStorage.mergeItem(STORAGE_KEY,
        JSON.stringify(
          {
            [title] : {
              ...data[title], prevScore:                  data[title].prevScore + 1 
            }
          }
        )
      )
    }
  )} else {
    return null
  }
}
