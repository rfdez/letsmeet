import request from 'supertest';
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import MeetingBackendApp from '../../../../../../src/apps/meeting/backend/MeetingBackendApp';

let _request: request.Test;
// let _response: request.Response;
let application: MeetingBackendApp;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route);
});

Then('the response status code should be {int}', async (status: number) => {
  // _response = await _request.expect(status);
  await _request.expect(status);
});

BeforeAll(async () => {
  // TODO: In case of need mock an environment implement a container (dependency injection)
  application = new MeetingBackendApp();
  await application.start();
});

AfterAll(async () => {
  // TODO: In case of need mock an environment implement a container (dependency injection)
  await application.stop();
});
