import React from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { green, white, grey } from '../Utils/colors'
import { connect } from 'react-redux'
import { addDeck } from '../Actions/index'
import { addDeckLocal } from '../Utils/storage'

class AddDeck extends React.Component {

   state = {
     newTitle: ''
   }

   addDeck = (title) => {
   this.setState({
       newTitle: ''
   })
    addDeckLocal(title)
      this.props.dispatch(addDeck(
       {
         title: title,
         prevScore: '0',
         questions: []
       }
     ))
     this.props.navigation.navigate('Deck', {title: title})
   }

    render(){
    return(
    <View style={styles.container}>
      <Text style={[styles.text, styles.textHeader]}>
        Add Deck
      </Text>
      <TextInput style={styles.text} placeholder="New Deck Title" onChangeText={(text => this.setState({
        newTitle: text
    }))} value={this.state.newTitle}/>
      <TouchableOpacity style={styles.iosSubmitBtn} onPress={() => this.addDeck(this.state.newTitle)}>
        <Text style={styles.buttontext}>Add Deck</Text>
      </TouchableOpacity>
    </View>
    )}
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

export default connect()(AddDeck)
