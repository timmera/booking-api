class BadRequest extends Error {
  constructor() {
    super(`Request body is invalid`);
    this.name = 'BadRequest';
  }
}

export default BadRequest;
