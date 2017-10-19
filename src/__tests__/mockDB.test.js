import db from '../mockDB';

it('returns a books array of one million', () => {
  const { books } = db;
  expect(books.length).toEqual(1000000);
});
it('returns a genres array with All as the first value', () => {
  const { genres } = db;
  expect(genres[0]).toEqual('All');
});
