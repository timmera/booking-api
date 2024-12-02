class NoValidFormat extends Error {
  constructor(resourceType, id) {
    super(`${resourceType}: ${id} was not in a valid format!`);
    this.name = 'NoValidFormat';
  }
}

export default NoValidFormat;
