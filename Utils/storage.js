import { AsyncStorage } from 'react-native'
import { setTestData } from './TestData'

export const STORAGE_KEY = 'FlashCards:Decks'

export function loadData () {
  return AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    return results === null ? setTestData().then(() => AsyncStorage.getItem(STORAGE_KEY).then((results) => {return JSON.parse(results)})) :
    JSON.parse(results)
  })
}

export function addDeckLocal(title) {
  AsyncStorage.getItem(STORAGE_KEY).then((results) => {
    parsedResults = JSON.parse(results)
    return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(
      {
        ...parsedResults,
        [title]: {
          title: title,
          questions: [],
          prevScore: '0'
        }
      }))}
    )
}

export function addQuestion (title, question) {
  return AsyncStorage.getItem(STORAGE_KEY).then(
    (results) => {
      const data = JSON.parse(results)
      AsyncStorage.mergeItem(STORAGE_KEY,
      JSON.stringify({
        [title]: {...data[title],
          questions: [...data[title].questions, question]
        }
      })
      )
    }
  )
}

export function deleteDeckLocal (title) {
  return AsyncStorage.getItem(STORAGE_KEY).then(
    (results) => {
      const data = JSON.parse(results)
      data[title] = undefined
      delete data[title]
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  )
}

export function updateScoreLocal (title, score) {
  AsyncStorage.getItem(STORAGE_KEY).then(
    (results) => {
      const data = JSON.parse(results)
      AsyncStorage.mergeItem(STORAGE_KEY,
        JSON.stringify(
          {
            [title] : {
              ...data[title], prevScore: score
            }
          }
        )
      )
    }
  ).catch(error => console.log(error))
}
