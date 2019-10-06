import React from 'react'
import { ChatManager, TokenProvider } from "@pusher/chatkit-client/react-native";
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {

  constructor () {
    super ();
    this.state = {
      messages : [],
      availableRooms: [],
      currentRooms: [],

    }
    this.sendMessage = this.sendMessage.bind(this);
  }
  
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId: 'klew5',
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser

      this.currentUser.getJoinableRooms()
      .then(availableRooms => {
        this.setState({
          availableRooms,
          currentRooms: this.currentUser.rooms
        })
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`)
      })

      this.currentUser.subscribeToRoom({
        roomId: "56b26459-b5e3-4ac2-9070-89619c2a27f7",
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      });
    })
    .catch(err => {
      console.log(`Error connecting: ${err}`)
    })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: "56b26459-b5e3-4ac2-9070-89619c2a27f7",
    });
  }

  render() {

    return (
      <div className="app">
        <RoomList rooms= {[...this.state.availableRooms,...this.state.currentRooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} /> 
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
