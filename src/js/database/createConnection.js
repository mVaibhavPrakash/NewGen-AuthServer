import mssql from 'mssql';
import sqlConfig from './dbConfig.js';

export async function createConnection() {
  try {
    const pool = await mssql.connect(sqlConfig);
    return pool;
  } catch (err) {
    console.log(err);
  }
}
