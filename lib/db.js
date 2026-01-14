// Import libraries and tools //
import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

// Define import env file //
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

// Initiate sequelize function //
export const mySequelize = () => {
  if (DB_URL) {
    return new Sequelize(DB_URL);
  } else {
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

let sequelize;
// Define singelton guard //
export let singleton = () => {
  // Create if running on development //
  if (process.env.NODE_ENV === 'development') {
    if (!global._newDB) {
      global._newDB = mySequelize();
    }
    return global._newDB;
    // Create else running on produciton //
  } else {
    return mySequelize();
  }
};
sequelize = singleton();
export default sequelize;



