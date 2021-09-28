export default class ProfileNotExist extends Error {
  constructor() {
    super(`The profile does not exists`);
  }
}
