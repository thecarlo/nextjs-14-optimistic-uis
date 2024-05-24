import { connect } from 'mongoose';

import { ENV_VARS } from '@functions/envVars';

export const mongoConnect = async (): Promise<void> => {
  try {
    const { mongoCollection, mongoUser, mongoPassword, mongoCluster } =
      ENV_VARS;

    const mongoUri = `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoCluster}/?retryWrites=true&w=majority`;

    await connect(mongoUri, { dbName: mongoCollection });
  } catch (error: any) {
    throw new Error(`mongoConnect error: ${error.message}`);
  }
};
