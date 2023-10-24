const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "instigpt"
})

app.post('/create-session', (req, res) => {
    const name = req.body.name;
  
    con.query('INSERT INTO sessions (name) VALUES (?)', [name], (err, result) => {
      if (err) {
        console.error('Database error: ' + err.message);
        res.status(500).send({ message: 'Database error' });
      } else {
        res.status(201).send({ message: 'Session created successfully' });
      }
    });
});
app.get('/get-sessions', (req, res) => {
    con.query('SELECT * FROM sessions', (err, result) => {
      if (err) {
        console.error('Database error: ' + err.message);
        res.status(500).send({ message: 'Database error' });
      } else {
        res.status(200).json(result);
      }
    });
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    con.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], 
        (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send({message: "ENTER CORRECT ASKED DETAILS!"})
            }
        }
    )
})

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], 
        (err, result) => {
            if(err){
                req.setEncoding({err: err});
            }else{
                if(result.length > 0){
                    res.send(result);
                }else{
                    res.send({message: "WRONG USERNAME OR PASSWORD!"})
                }
            }
        }
    )
})

app.listen(3001, () => {
    console.log("running backend server");
})

app.post('/send-message', (req, res) => {
    const message = req.body.message; // Assuming your client sends the message in the request body
  
    // Insert the message into the database
    con.query("INSERT INTO messages (message_text) VALUES (?)", [message], (err, result) => {
      if (err) {
        console.error('Database error: ' + err.message);
        res.status(500).send({ message: "Database error" });
      } else {
        res.status(201).send({ message: "Message saved successfully" });
      }
    });
  });
  
  // ...

// Create a new session
app.post('/create-session', (req, res) => {
    const name = req.body.name;
  
    con.query('INSERT INTO sessions (name) VALUES (?)', [name], (err, result) => {
      if (err) {
        console.error('Database error: ' + err.message);
        res.status(500).send({ message: 'Database error' });
      } else {
        res.status(201).send({ message: 'Session created successfully' });
      }
    });
  });
  
  // Retrieve sessions
  app.get('/get-sessions', (req, res) => {
    con.query('SELECT * FROM sessions', (err, result) => {
      if (err) {
        console.error('Database error: ' + err.message);
        res.status(500).send({ message: 'Database error' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  // Retrieve messages based on session name
  app.get('/get-messages', (req, res) => {
    const sessionName = req.query.sessionName;
  
    con.query(
      'SELECT messages.message_text, users.username FROM messages ' +
        'INNER JOIN users ON messages.user_id = users.id ' +
        'INNER JOIN sessions ON messages.session_id = sessions.id ' +
        'WHERE sessions.name = ?',
      [sessionName],
      (err, result) => {
        if (err) {
          console.error('Database error: ' + err.message);
          res.status(500).send({ message: 'Database error' });
        } else {
          res.status(200).json(result);
        }
      }
    );
  });
  
