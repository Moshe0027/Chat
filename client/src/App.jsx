import { useState, useEffect } from 'react'
import './App.css'
import socketIO from 'socket.io-client';
const socket = socketIO('http://localhost:3000')

const App = () => {
  const [connect, setConnect] = useState();
  const [textInput, setTextInput] = useState();
  const [listText, setListText] = useState([]);

  const listItem = listText.map((ele, index) => <li key={index}>{ele}</li>);

  const sendMessage = () => {
    socket.emit('message', textInput);
  }

  useEffect(() => {
    socket.on('connect', () => {
      setConnect(`You connected with id: ${socket.id}`)
    })

    socket.on('receive_message', (message) => {
      setListText(listText => [...listText, message]);
    })
  }, [socket])


  return (
    <div className="App">
      <h5>{connect}</h5>
      <ul>
        {listItem}
      </ul>
      <input type="text" placeholder="Text" onChange={(e) => setTextInput(e.target.value)} />
      <button onClick={sendMessage}> Send Message</button>
    </div>
  )
}

export default App
