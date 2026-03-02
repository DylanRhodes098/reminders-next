// - - - // - - - //
// Imports
// - - - // - - - //

// < - Import libraries and tools - > //
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

// < - Define env file attributes - > //
export const {
  DB_URL,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST = 'localhost',
  DB_DIALECT = 'mysql',
  DB_PORT = 3306,
  JWT_SECRET,
} = process.env;

// »« - »« »« - »« »« - »« //
// Sequelize function to t=communicate with DB //
// »« - »« »« - »« »« - »« //
export const mySequelize = () => {

  // * * * //
  // If there is a url //
  // * * * //
  if (DB_URL) {

    // < - Trigger the sequlize communicator to talk to a existing DB credcetials - > //
    return new Sequelize(DB_URL);

  // < * * else * * > //
  } else {

    // < - Trigger the Sequalize communicator, to talk to the DB with the follwoign crdentials - > //
    return new Sequelize(
      DB_DATABASE,
      DB_USERNAME,
      DB_PASSWORD,
      {
        host: DB_HOST,
        dialect: DB_DIALECT,
        port: DB_PORT,
        dialectModule: mysql,
      },
    );
  }
};

// < - Something called sequalize - > //
let sequelize;
// »« - »« »« - »« »« - »« //
// Singelton function for a saftery ext if DB is running on development //
// »« - »« »« - »« »« - »« //
export let singleton = () => {

  // * * * //
  // If Running on development //
  // * * * //
  if (process.env.NODE_ENV === 'development') {

    // * * * //
    // If there isnt a DB //
    // * * * //
    if (!global._newDB) {

      // < - Define th DB as the one identified in the mySequzlie function - > //
      global._newDB = mySequelize();
    }

    // < - return the DB - > //
    return global._newDB;

  // < * * else * * > //
  } else {

    // < - use the mySequzlie db - > //
    return mySequelize();
  }
};

 // < - Define sequzlie as the isngleton function - > //
sequelize = singleton();

export default sequelize;



