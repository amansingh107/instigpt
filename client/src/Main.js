import React, { useState, useEffect } from 'react';
import Axios from 'axios';


function Main() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [sessionName, setSessionName] = useState('Default'); // Default session name
  const [availableSessions, setAvailableSessions] = useState([]); // To store available sessions

  // Function to create a new session
  const createNewSession = () => {
    const newSessionName = prompt('Enter a new session name:');
    if (newSessionName) {
      // Send a request to the server to create a new session
      Axios.post('/create-session', { name: newSessionName })
        .then((response) => {
          // Reload the list of available sessions
          fetchSessions();
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  };
  
  const handleLogout = () => {
    // Perform any necessary actions to log the user out (e.g., clear session or token)
    // For example, if you're using token-based authentication, you can clear the token:
    // localStorage.removeItem('token');

    // Redirect the user to the login page
    history.push('/login');
  };
  // Fetch available sessions
  const fetchSessions = () => {
    Axios.get('/get-sessions')
      .then((response) => {
        setAvailableSessions(response.data);
      })
      .catch((error) => {
        // Handle any errors
      });
  };



  // Switch to a different session
  const switchSession = (newSessionName) => {
    setSessionName(newSessionName);
  };

  // Function to send a message to the server
  const sendToServer = (message) => {
    Axios.post('/send-message', { message, sessionName }) // Include session name
      .then((response) => {
        // Handle the response from the server, e.g., show a success message
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
      });
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      // Send the message to the server
      sendToServer(inputText);
      // Add the new message to the messages array
      setMessages([...messages, { user: 'You', message: inputText }]);
      // Clear the input field
      setInputText('');
    }
  };

  // Function to retrieve messages from the server
  const fetchMessages = () => {
    Axios.get('/get-messages', { params: { sessionName } }) // Include session name
      .then((response) => {
        // Update the messages state with the retrieved messages
        setMessages(response.data);
      })
      .catch((error) => {
        // Handle any errors, e.g., show an error message
      });
  };

  // Fetch messages when the component mounts and when the sessionName changes
  useEffect(() => {
    fetchMessages();
    fetchSessions();
  }, [sessionName]);

  return (
    <div className="container mt-5">
      <h1>Message App</h1>

      {/* Display current session name */}
      <h2>Session: {sessionName}</h2>

      {/* Button to create a new session */}
      <button onClick={createNewSession}>New Session</button>

      {/* List of available sessions */}
      <div>
        <h3>Available Sessions:</h3>
        <ul>
          {availableSessions.map((session, index) => (
            <li key={index}>
              <button onClick={() => switchSession(session.name)}>{session.name}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
      <div className="message-box">
        {messages.map((message, index) => (
          <div key={index} className="alert alert-primary" role="alert">
            {message.user}: {message.message}
          </div>
          
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Main;
