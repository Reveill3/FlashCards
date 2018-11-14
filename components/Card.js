import React, { Fragment } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { purple,  green,  red } from '../Utils/colors'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { updateScoreLocal } from '../Utils/storage'
import { updateScore } from '../Actions/index'
import { setLocalNotification, clearLocalNotification } from '../Utils/notifications'

class Card extends React.Component {
  state ={
    question: true,
    questionIndex: 0,
    score: 0,
  }


  submitAnswer = (result) => {
      const questionsLengthIndex = this.props.questions.length - 1
      if (this.state.questionIndex  === questionsLengthIndex) {
        this.completeQuiz(result)
      }
      this.setState({
        score: result === 'correct' ? this.state.score + 1 : this.state.score,
        questionIndex: this.state.questionIndex  === questionsLengthIndex ? 'complete': this.state.questionIndex + 1
      })

  }

  restartQuiz = () => {
    this.props.dispatch(updateScore(this.state.score, this.props.navigation.getParam('title')))
    this.setState({
      questionIndex: 0,
      score: 0
    })
  }

  completeQuiz =  (result) => {
    const title = this.props.navigation.getParam('title')
    updateScoreLocal( title, result === 'correct' ? this.state.score + 1: this.state.score)
    clearLocalNotification().then(setLocalNotification)
  }

  render() {
  const { questionIndex } = this.state
  console.log(this.state.question)
    return(
    <View style= {styles.container}>
{   questionIndex === 'complete' ?
 (
  <Fragment>
  <Text style={styles.deckText}>Quiz Complete</Text>
  <Text style={styles.deckText}>Score: {this.state.score}</Text>
  <Text style={styles.deckText}>Previous Score: {this.props.prevScore}</Text>
  <TouchableOpacity style={styles.correctButton} onPress = {() => this.restartQuiz()}>
  <Text >Restart Quiz</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.incorrectButton} onPress = {() => this.props.navigation.navigate('Decks')}>
    <Text>View Decks</Text>
  </TouchableOpacity>
  </Fragment>
)
:
 (
    <Fragment>
    { this.props.questions[questionIndex] !== undefined ?
        (   <Fragment>
                <Text style={styles.deckText}>
              {this.state.question ? this.props.questions[questionIndex].question: this.props.questions[questionIndex].answer}
            </Text>
                <TextButton style={styles.deleteText} onPress={() => this.setState({question: !this.state.question})}>{this.state.question ? 'Click To Show Answer':'Click To Show Question'}</TextButton>
                <TouchableOpacity style={styles.correctButton} onPress = {() => this.submitAnswer('correct')}>
                <Text >Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.incorrectButton} onPress = {() => this.submitAnswer('incorrect')}>
                  <Text>Incorrect</Text>
                </TouchableOpacity>
                <Text style={styles.deckText}>Questions Remaining: {this.props.questions.length - this.state.questionIndex - 1 }</Text>
            </Fragment>
          ) :
          (
              <Text>There are no questions in this deck. Go back and add questions to start a quiz.</Text>
          )}
      </Fragment>


      )
      }
    </View>
   )
    }
}

const styles = StyleSheet.create(
  {
  correctButton: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40
  },
  incorrectButton: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
    marginBottom: 20
},
container: {
    flex: 1,
    justifyContent: 'center',
},
deckText: {
    textAlign: 'center',
    fontSize: 24
},
deleteText: {
    textAlign: 'center',
    marginBottom: 50
}
  }
)

function mapStateToProps (state, ownProps) {
  return {
  prevScore: state[ownProps.navigation.getParam('title')].prevScore,
  questions: state[ownProps.navigation.getParam('title')].questions
}
}

export default connect(mapStateToProps)(Card)
