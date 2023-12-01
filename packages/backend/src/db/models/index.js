import { Sequelize } from 'sequelize';
import Rooms from './rooms.js';
import Messages from './messages.js';

console.info('Initializing sequelize...');

console.log(process.env.DATABASE_URL);
const sqlInitialize = () => {
  if (process.env.NODE_ENV !== 'local') {
    // process.env.DEVELOPMENT
    const connectionString = process.env.DATABASE_URL;
    return new Sequelize(connectionString, {});
  }

  return new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.POSTGRES_HOST,
      dialect: 'postgres',
      logging: false,
      pool: {
        min: 0,
        max: 50,
        idle: 10000,
        acquire: 30000,
      },
    }
  );
};

export const sequelize = sqlInitialize();

export const initModels = async (sequelizeInst) => {
  try {
    console.info('Initializing sequelize models...');
    await Rooms.initModel(sequelizeInst);
    await Messages.initModel(sequelizeInst);
  } catch (error) {
    console.log(error);
  }
};

export const initAssociation = async () => {
  try {
    console.info('Initializing sequelize associations...');
    await Rooms.initAssociation();
    await Messages.initAssociation();
  } catch (error) {
    console.log(error);
  }
};

export const initializeSequelize = async () => {
  await sequelize.authenticate();
  await initModels(sequelize);
  await initAssociation();
};
