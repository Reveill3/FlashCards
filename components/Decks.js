import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TextButton from './TextButton'
import { green, white } from '../Utils/colors'
import { loadData } from '../Utils/storage'
import { connect } from 'react-redux'
import { receiveDecks } from '../Actions/index'


class Decks extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    loadData().then((decksData) => {
      dispatch(receiveDecks(decksData))
        }
      ).catch(error => console.log(error))
  }



    render(){

    return(
    <View>
      {Object.keys(this.props.loadedDecks)
      .map(Deck =>
      <TouchableOpacity key={this.props.loadedDecks[Deck].title} style={styles.iosSubmitBtn} onPress={() => this.props.navigation.navigate('Deck',
      { title: this.props.loadedDecks[Deck].title})}>
        <Text style={styles.submitBtnText}>{this.props.loadedDecks[Deck].title}</Text>
        <Text style={styles.submitBtnText}>Questions In Deck: {this.props.loadedDecks[Deck].questions.length}</Text>
      </TouchableOpacity>
      )}
    </View>)}
}

const styles = StyleSheet.create(
  {
    iosSubmitBtn: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 70,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 5,
  },
    submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  }
)

function mapStateToProps (state){
  return {
    loadedDecks: state
  }
}

export default connect(mapStateToProps)(Decks)
