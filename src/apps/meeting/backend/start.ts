import MeetingBackendApp from './MeetingBackendApp';

try {
  new MeetingBackendApp().start();
} catch (e) {
  console.error(e);
  process.exit(1);
}

process.on('uncaughtException', error => {
  console.error('uncaughtException', error);
  process.exit(1);
});
