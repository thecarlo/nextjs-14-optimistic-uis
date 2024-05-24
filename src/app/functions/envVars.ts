import { EnvironmentVariables } from '@interfaces/environmentVariables';

const {
  MONGO_COLLECTION,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_CLUSTER,
  BASE_URL,
  NODE_ENV,
  IS_BUILD_MOCK,
} = process.env;

export const ENV_VARS: EnvironmentVariables = {
  mongoCollection: MONGO_COLLECTION ?? '',
  mongoUser: MONGO_USER ?? '',
  mongoPassword: MONGO_PASSWORD ?? '',
  mongoCluster: MONGO_CLUSTER ?? '',
  baseUrl: BASE_URL ?? '',
  nodeEnv: NODE_ENV ?? '',
  isBuildMock: IS_BUILD_MOCK === 'true',
};
