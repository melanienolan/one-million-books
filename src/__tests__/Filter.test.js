import React from 'react';
import Filter from '../Components/Filter';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import db from '../mockDB';

Enzyme.configure({ adapter: new Adapter() });
const { genres, specialDates } = db;

it('renders filter component without crashing', () => {
  // const {genres} = db;
  const filter = genres[4];
  Enzyme.shallow(
    <Filter filterCategories={genres} filterType="genre" activeFilter={filter} />
  );
});
it('renders genre filter component with All', () => {
  const filter = genres[0];
  const filterComponent = Enzyme.shallow(
    <Filter filterCategories={genres} filterType="genre" activeFilter={filter} />
  );
  expect(toJson(filterComponent)).toMatchSnapshot();
});
it('renders special dates filter component with Halloween', () => {
  const filter = specialDates[1];
  const filterComponent = Enzyme.shallow(
    <Filter
      filterCategories={specialDates}
      filterType="specialDates"
      activeFilter={filter}
    />
  );
  expect(toJson(filterComponent)).toMatchSnapshot();
});
