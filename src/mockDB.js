export const genres = [
  'All',
  'Finance',
  'Science fiction',
  'Satire',
  'Drama',
  'Action and Adventure',
  'Romance',
  'Mystery',
  'Horror',
  'Self help',
  'Health',
  'Guide',
  'Travel',
  "Children's",
  'Religion, Spirituality & New Age',
  'Science',
  'History',
  'Math',
  'Anthology',
  'Poetry',
  'Encyclopedias',
  'Dictionaries',
  'Comics',
  'Art',
  'Cookbooks',
  'Diaries',
  'Journals',
  'Prayer books',
  'Series',
  'Trilogy',
  'Biographies',
  'Autobiographies',
  'Fantasy'
];
export const genders = ['All', 'Male', 'Female'];
export const specialDates = [
  'All',
  'Halloween',
  'Last Friday of Month',
  'Halloween and Last Friday'
];

export const lastFridays = (() => {
  const lastWeekDaysOfYear = (iWeekDay, y) =>
    [
      31,
      (0 === y % 4 && 0 !== y % 100) || 0 === y % 400 ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ].map(
      (d, m) =>
        new Date(
          Date.UTC(y, m, d - (new Date(Date.UTC(y, m, d)).getDay() + (7 - iWeekDay)) % 7)
        )
    );
  const days = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };
  const curry = f => a => b => f(a, b);
  const isoDateString = dte => dte.toISOString().substr(0, 10);
  const range = (m, n) =>
    Array.from(
      {
        length: Math.floor(n - m) + 1
      },
      (_, i) => m + i
    );
  const currentYear = new Date().getUTCFullYear();
  const initialYear = currentYear - 100;
  const flatten = arr => [].concat(...arr);
  return flatten(
    range(initialYear, currentYear)
      .map(curry(lastWeekDaysOfYear)(days.friday))
      .map(row => row.map(isoDateString))
  );
})();

// function getGenres() {
//   return new Promise(res => {
//     setTimeout(() => {
//       res(genres);
//     }, 100);
//   });
// }
// export default {
//   getGenres
// };
