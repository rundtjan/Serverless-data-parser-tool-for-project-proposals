import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [data, setData] = useState([])
  const [words, setWords] = useState([])
  const channel = 'C02UNV80V7B'

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/data/${channel}`)
      .then(response => {
        setData(response.data.messages)
        setWords(response.data.words)
      })
  }, [])

  const Messages = () => {
    return (
        <div>
          <h2> Messages from slack channel {channel}</h2>
          {data.map(message => 
          <p key={message.client_msg_id}>'<b>{message.text}</b>' was sent by user {message.user}</p>)}
        </div>
    )
  }

  const Words = () => {
    return (
      <div>
        <h3>Words from messages</h3>
        {words.map(w => (
          <li key={w}>{w}</li>
        ))}
      </div>
    )
  }

  return (
    <div className="App">
      <Messages/>
      <Words/>
    </div>
  )
}

export default App
