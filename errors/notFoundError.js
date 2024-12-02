class NotFoundError extends Error {
  constructor(resourceType, id) {
    super(`${resourceType}: ${id} was not found!`);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
