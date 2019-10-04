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

    }
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
      currentUser.subscribeToRoom({
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
  
  }

  render() {

    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm /> 
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
