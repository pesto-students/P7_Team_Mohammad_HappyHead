import React from 'react';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// Update the adapter import

require('text-encoding').TextEncoder = require('util').TextEncoder;

import Tile1 from './Tile1.jsx';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });


describe('Tile1', () => {
  it('renders without crashing', () => {
    mount(<Tile1 />);
  });

  it('displays the correct title', () => {
    const wrapper = mount(<Tile1/>);
    const title = wrapper.find('Title');
    expect(title.text()).toBe('Find more joy');
  });

  it('displays the correct subtext', () => {
    const wrapper = mount(<Tile1 />);
    const subtext = wrapper.find('SubText');
    expect(subtext.text()).toBe('Catch your breath, relax your mind, and feel 14% less stressed in just 10 days.');
  });
});
