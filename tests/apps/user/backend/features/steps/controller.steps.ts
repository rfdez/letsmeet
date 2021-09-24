import request from 'supertest';
import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import UserBackendApp from '../../../../../../src/apps/user/backend/UserBackendApp';
import assert from 'assert';

let _request: request.Test;
let _response: request.Response;
let application: UserBackendApp;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer).get(route);
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = request(application.httpServer).put(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepEqual(_response.body, {});
});

BeforeAll(async () => {
  // TODO: In case of need mock an environment implement a container (dependency injection)
  application = new UserBackendApp();
  await application.start();
});

AfterAll(async () => {
  // TODO: In case of need mock an environment implement a container (dependency injection)
  await application.stop();
});
