import faker from 'faker';
import isFriday from 'date-fns/is_friday';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import differenceInDays from 'date-fns/difference_in_days';

let genres = [
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
let genders = ['All', 'Male', 'Female'];
let specialDates = [
  'All',
  'Halloween',
  'Last Friday of Month',
  'Halloween and Last Friday'
];

const generateBooks = numberOfBooks => {
  const capitalizeWords = str => {
    return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const isDateSpecial = date => {
    const isLastFriday =
      isFriday(date) && differenceInDays(lastDayOfMonth(date), date) < 7 ? true : false;
    if (isLastFriday && date.slice(5) === '10-31') {
      return 'Halloween and Last Friday';
    }
    if (date.slice(5) === '10-31') {
      return 'Halloween';
    }
    if (isLastFriday) {
      return 'Last Friday of Month';
    } else {
      return null;
    }
  };
  // remove All from list of genres and genders
  const _genres = genres.slice(1);
  const _genders = genders.slice(1);

  const books = [...Array(numberOfBooks)].map((_, i) => {
    const id = i;
    const title = capitalizeWords(faker.lorem.words());
    const authorFirstName = faker.name.firstName();
    const authorLastName = faker.name.lastName();
    const authorName = `${authorLastName}, ${authorFirstName}`;
    const authorGender = _genders[Math.floor(Math.random() * _genders.length)];
    const genre = _genres[Math.floor(Math.random() * _genres.length)];
    const published = faker.date.past(100).toISOString().substr(0, 10);
    const special = isDateSpecial(published);
    const visible = 1;
    return {
      id,
      title,
      authorName,
      authorGender,
      genre,
      published,
      special,
      visible
    };
  });
  return books;
};
const allBooks = generateBooks(1000000);

function getBooks() {
  return new Promise(res => {
    setTimeout(() => {
      res(allBooks);
    }, 2000);
  });
}

export default { getBooks, genres, genders, specialDates };
