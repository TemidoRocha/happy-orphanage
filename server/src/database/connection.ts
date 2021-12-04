import { createConnection } from 'typeorm';

const connection = createConnection()
  .then((connection) => {
    // here you can start to work with your entities
    console.log('## Connction Created');
  })
  .catch((error) => {
    console.log('#Error# connection');
    console.log(error);
  });