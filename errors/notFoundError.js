class NotFoundError extends Error {
  constructor(resourceType, id = '') {
    const message = id
      ? `${resourceType}: ${id} not found!`
      : `${resourceType} not found!`;
    super(message);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
