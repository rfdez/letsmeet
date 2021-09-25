import convict from 'convict';
import path from 'path';

const userConfig = convict({
  env: {
    doc: 'The application environment',
    format: ['production', 'development', 'staging', 'test'],
    default: 'default',
    env: 'NODE_ENV'
  },
  mongo: {
    url: {
      doc: 'The mongo connection URL',
      format: String,
      default: 'mongodb://mongodb:27017/user-backend-dev',
      env: 'MONGO_URL'
    }
  }
});

const defaultFilePath = path.join(__dirname, '/default.json');
const envFile = `${userConfig.get('env')}.json`;
const envFilePath = path.join(__dirname, '/', envFile);

userConfig.loadFile([defaultFilePath, envFilePath]);

export default userConfig;
