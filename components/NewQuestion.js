import React from 'react'
import {TextInput, View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { white, green, grey } from '../Utils/colors'
import { connect } from 'react-redux'
import { addQuestion } from '../Utils/storage'
import { newQuestion } from '../Actions/index'


class NewQuestion extends React.Component {
  state = {
      question: true,
      questionText: '',
      answerText: ''
  }

  handlePress = () => {
    this.setState(
      {
        question: !this.state.question
      }
    )
  }

  submitQuestion = () => {
    const { dispatch } = this.props
    const question = {
      question: this.state.questionText,
      answer: this.state.answerText
    }
    const title = this.props.navigation.getParam('title')
    addQuestion(title, question).then(() => {
    dispatch(newQuestion(question, title))
    this.props.navigation.navigate('Deck')
  }
  ).catch(error => console.log(error))

  }

  render () {
   const view  = this.state.question ? 'question':'answer'
      return   (
        <View style={styles.container}>
        <Text style={styles.text}>{ view === 'question' ? 'New Question': 'New Answer'}</Text>
        <TextInput style={styles.text} onChangeText= { (text) => this.setState({
          [view + 'Text']: text
        }
    ) } value={this.state[view + 'Text']} placeholder='Enter Text Here'/>
      { view === 'question' ?
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={this.handlePress}>
        <Text style={styles.buttontext}>Add Question</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.iosSubmitBtn} onPress={this.submitQuestion}>
        <Text style={styles.buttontext}>Submit Question</Text>
        </TouchableOpacity>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
      iosSubmitBtn: {
      backgroundColor: green,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 30
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttontext: {
        color: white,
        textAlign: 'center',
        fontSize: 24
    },
   text: {
        textAlign: 'center',
        fontSize: 24
    },
    textHeader: {
        color: grey,
      borderBottomWidth: 4,
      fontSize: 24,
    }
  }
)

export default connect()(NewQuestion)
