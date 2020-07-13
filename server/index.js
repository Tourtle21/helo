require('dotenv').config();

const express = require('express'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      postCtrl = require('./controllers/postController'),
      {SERVER_PORT, CONNECTION_STRING} = process.env,
      app = express()


app.use(express.json());


app.post('/auth/register', authCtrl.createUser);
app.post('/auth/login', authCtrl.loginUser);

app.get('/api/posts/:id', postCtrl.getFilteredPosts);
app.get('/api/post/:id', postCtrl.getPost);
app.post('/api/posts/:id', postCtrl.createPost);
app.delete('/api/posts/:id', postCtrl.deletePost);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log("DATABASE CONNECTED")
}).catch(err => console.log(err))


app.listen(SERVER_PORT, () => console.log(`Server is running on ${SERVER_PORT}`))

