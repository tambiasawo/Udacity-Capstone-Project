import  { getInfo } from '../src/client/js/app'

describe('search on submit', () => {
  test('getInfo() should be defined', () => {
    expect(getInfo).toBeDefined();
  });
});
