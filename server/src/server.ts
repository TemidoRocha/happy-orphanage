import express from 'express';

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  console.log('## /users accessed');
  return res.send({ messge: 'Hello World' });
});

app.listen(3333);
