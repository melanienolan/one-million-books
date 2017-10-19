import React from 'react';
import Sort from '../Components/Sort';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

it('renders sort component without crashing', () => {
  Enzyme.shallow(<Sort type="title" />);
});
it('renders sort component with title', () => {
  const sortComponent = Enzyme.shallow(<Sort type="title" />);
  expect(toJson(sortComponent)).toMatchSnapshot();
});
it('renders sort component with id', () => {
  const sortComponent = Enzyme.shallow(<Sort type="id" />);
  expect(toJson(sortComponent)).toMatchSnapshot();
});
