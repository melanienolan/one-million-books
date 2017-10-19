import React from 'react';
import GenerateButton from '../Components/GenerateButton';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

it('renders generate button component without crashing', () => {
  Enzyme.shallow(<GenerateButton number={10} />);
});
it('renders generate button component with 10', () => {
  const generateButtonComponent = Enzyme.shallow(<GenerateButton number={10} />);
  expect(toJson(generateButtonComponent)).toMatchSnapshot();
});
it('renders generate button component with 1000000', () => {
  const generateButtonComponent = Enzyme.shallow(<GenerateButton number={1000000} />);
  expect(toJson(generateButtonComponent)).toMatchSnapshot();
});
