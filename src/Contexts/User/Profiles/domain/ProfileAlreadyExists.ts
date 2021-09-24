export default class ProfileAlreadyExists extends Error {
  constructor(id: string) {
    super(`Profile ${id} already exists`);
  }
}
