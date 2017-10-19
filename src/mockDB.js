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
  'Children',
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

/**** New generateBooks function, takes 4 secs ****/
const generateBooks = numberOfBooks => {
  const capitalizeWords = str => {
    return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const isDateSpecial = date => {
    const isAFriday = isFriday(date);
    const isHalloween = date.slice(5) === '10-31';
    if (!isAFriday) {
      if (isHalloween) return 'Halloween';
      return null;
    }
    const isLastFriday = differenceInDays(lastDayOfMonth(date), date) < 7 ? true : false;
    if (!isLastFriday) return null;
    if (isHalloween) return 'Halloween and Last Friday';
    return 'Last Friday of Month';
  };

  // remove All from list of genres and genders
  const _genres = genres.slice(1);
  const _genders = genders.slice(1);
  let books = [],
    i,
    published,
    special,
    authorName,
    authorGender;

  for (i = 0; i < numberOfBooks; i++) {
    if (i > 15000) {
      let randomBook = books[Math.floor(Math.random() * books.length)];
      published = randomBook.published;
      special = randomBook.special;
    } else {
      published = faker.date.past(40).toISOString().substr(0, 10);
      special = isDateSpecial(published);
    }
    if (i > 50000) {
      let randomBook = books[Math.floor(Math.random() * books.length)];
      authorName = randomBook.authorName;
      authorGender = randomBook.authorGender;
    } else {
      authorName = `${faker.name.firstName()}, ${faker.name.lastName()}`;
      authorGender = _genders[Math.floor(Math.random() * _genders.length)];
    }
    const id = i;
    const title = capitalizeWords(faker.lorem.words());
    const genre = _genres[Math.floor(Math.random() * _genres.length)];
    const visible = 1;
    books.push({
      id,
      title,
      authorName,
      authorGender,
      genre,
      published,
      special,
      visible
    });
  }
  return books;
};

/**** Original generateBooks function, takes 11 secs ****/

// const generateBooks = numberOfBooks => {
//   console.time('generate');
//   const capitalizeWords = str => {
//     return str.replace(/\w\S*/g, txt => {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//     });
//   };
//
// const isDateSpecial = date => {
//   const isAFriday = isFriday(date);
//   const isHalloween = date.slice(5) === '10-31';
//   if (!isAFriday) {
//     if (isHalloween) return 'Halloween';
//     return null;
//   }
//   const isLastFriday = differenceInDays(lastDayOfMonth(date), date) < 7 ? true : false;
//   if (!isLastFriday) return null;
//   if (isHalloween) return 'Halloween and Last Friday';
//   return 'Last Friday of Month';
// };
//   // remove All from list of genres and genders
//   const _genres = genres.slice(1);
//   const _genders = genders.slice(1);
//
//   const books = [...Array(numberOfBooks)].map((_, i) => {
//     const id = i;
//     const title = capitalizeWords(faker.lorem.words());
//     const authorFirstName = faker.name.firstName();
//     const authorLastName = faker.name.lastName();
//     const authorName = `${authorLastName}, ${authorFirstName}`;
//     const authorGender = _genders[Math.floor(Math.random() * _genders.length)];
//     const genre = _genres[Math.floor(Math.random() * _genres.length)];
//     const published = faker.date.past(100).toISOString().substr(0, 10);
//     const special = isDateSpecial(published);
//     const visible = 1;
//     return {
//       id,
//       title,
//       authorName,
//       authorGender,
//       genre,
//       published,
//       special,
//       visible
//     };
//   });
//   console.timeEnd('generate');
//   return books;
// };

const books = generateBooks(1000000);

export default { books, genres, genders, specialDates };
