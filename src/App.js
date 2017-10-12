import React, { Component } from 'react'
import openSocket from 'socket.io-client'
import './App.css'

const socket = openSocket('http://localhost:3001')

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount () {
    socket.on('initial messages', (messages) => {
      this.setState({messages: messages})
    })
    socket.on('chat message', (msg) => {
      this.setState({messages: this.state.messages.concat(msg)})
    })
  }

  submitMessage (e) {
    e.preventDefault()
    socket.emit('chat message', document.getElementById('message').value)
    document.getElementById('message').value = ''
  }

  render () {
    let messages = this.state.messages.map((message, i) => (<li key={i}>{message}</li>))
    return (
      <div>
        <ul id='messages'>{messages}</ul>
        <form action='' onSubmit={this.submitMessage}>
          <input id='message' /><button type='submit'>Send</button>
        </form>
      </div>
    )
  }
}

export default App
