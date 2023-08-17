import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const { 
  WHITE_LABEL_DB_USER, 
  WHITE_LABEL_DB_PASS, 
  WHITE_LABEL_DB_HOST,
  WHITE_LABEL_DB_DEV_DB_NAME,
  WHITE_LABEL_DB_TEST_DB_NAME,
  WHITE_LABEL_DB_PROD_DB_NAME,
  NODE_ENV
} = process.env;

export class SequelizeConnection {
  public credentials;
  private databaseCredentials = {
    "development": {
      "username": WHITE_LABEL_DB_USER,
      "password": WHITE_LABEL_DB_PASS,
      "database": WHITE_LABEL_DB_DEV_DB_NAME,
      "host": WHITE_LABEL_DB_HOST,
      "dialect": "postgres"
    },
    "test": {
      "username": WHITE_LABEL_DB_USER,
      "password": WHITE_LABEL_DB_PASS,
      "database": WHITE_LABEL_DB_TEST_DB_NAME,
      "host": WHITE_LABEL_DB_HOST,
      "dialect": "postgres"
    },
    "production": {
      "username": WHITE_LABEL_DB_USER,
      "password": WHITE_LABEL_DB_PASS,
      "database": WHITE_LABEL_DB_PROD_DB_NAME,
      "host": WHITE_LABEL_DB_HOST,
      "dialect": "postgres"
    }
  };

  constructor() {
    const { username, password, database, host, dialect } = this.databaseCredentials[NODE_ENV];
    this.credentials = { username, password, database, host, dialect };
  }

  public init(): Sequelize {    
    return new Sequelize(
      'ada_tech',
      'postgres',
      '123456',
      {
        host: 'localhost',
        dialect: 'postgres',
        logging: (...msg) => console.log(msg),
      }
    );
  }
}