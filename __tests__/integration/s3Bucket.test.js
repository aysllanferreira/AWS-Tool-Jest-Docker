const {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
} = require('@jest/globals');

const { S3 } = require('../../src/factory');
const { main } = require('../../src');

describe('Testing AWS Services offline with LocalStack', () => {
  const bucketConfig = {
    Bucket: 'test-bucket',
  }
  beforeAll(async () => {
    await S3.createBucket(bucketConfig).promise();
  });

  afterAll(async () => {
    await S3.deleteBucket(bucketConfig).promise();
  });


  it('it should return an array with S3 Bucket.', async () => {
    const expected = bucketConfig.Bucket;
    const { body, statusCode } = await main();
    const { allBuckets: { Buckets } } = JSON.parse(body);
    const { Name } = Buckets.find(({ Name }) => Name === expected);
    expect(Name).toEqual(expected);
    expect(statusCode).toEqual(200);
  });
});