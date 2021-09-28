import RecommendationBackendApp from './RecommendationBackendApp';

const manageUncaughtException = (error: Error, origin: string) => {
  console.error('uncaughtException', `${error}: ${origin}`);
  process.exit(1);
};

(async function start() {
  try {
    const server = new RecommendationBackendApp();
    await server.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  process.on('uncaughtException', manageUncaughtException);
})();
