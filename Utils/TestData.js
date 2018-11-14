import { AsyncStorage } from 'react-native'
import { STORAGE_KEY } from './storage'

export function setTestData () {
  const testData = {
  React: {
    prevScore: 0,
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    prevScore: 0,
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(testData))
}
