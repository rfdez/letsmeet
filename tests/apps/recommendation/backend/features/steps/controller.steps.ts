import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';
import container from '../../../../../../src/apps/recommendation/backend/dependency-injection';
import RecommendationBackendApp from '../../../../../../src/apps/recommendation/backend/RecommendationBackendApp';
import EnvironmentArranger from '../../../../../Contexts/Shared/infrastructure/Arranger/EnvironmentArranger';

let _request: request.Test;
let _response: request.Response;
let application: RecommendationBackendApp;

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

Then('the response should be:', async response => {
  const expectedResponse = JSON.parse(response);
  _response = await _request;
  assert.notDeepStrictEqual(_response.body, expectedResponse);
});

BeforeAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Recommendation.EnvironmentArranger');
  await (await environmentArranger).arrange();
  application = new RecommendationBackendApp();
  await application.start();
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get('Recommendation.EnvironmentArranger');
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
  await application.stop();
});
