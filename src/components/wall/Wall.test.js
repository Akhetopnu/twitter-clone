import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Wall } from './Wall.jsx';
import { store } from '../../store';
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Wall', () => {
  it('renders without crashing', () => {
    const match = {
      params: {
        id: 1,
      },
    };

    expect(shallow(
      <Provider store={store}>
        <Router>
          <Wall match={match}/>
        </Router>
      </Provider>
    )).toBeTruthy();
  });

  describe('.isMatch', () => {
    const isMatch = (search, post) =>
      Wall.WrappedComponent.prototype.isMatch.call(
        { state: { search } },
        post,
      );

    it('everything is empty so the post passes', () => {
      expect(isMatch('', { title: '', body: '' })).toBe(true);
    });

    it('neither title nor body', () => {
      expect(isMatch('000', { title: '111', body: '111' })).toBe(false);
    });

    it('either title or body', () => {
      expect(isMatch('000', { title: '000', body: '111' })).toBe(true);
      expect(isMatch('000', { title: '111', body: '000' })).toBe(true);
    });

    it('matches a substring', () => {
      expect(isMatch('0', { title: '000', body: '111' })).toBe(true);
      expect(isMatch('0', { title: '111', body: '000' })).toBe(true);
    });

    it('too long - even though it contains whole title or body', () => {
      expect(isMatch('0000', { title: '000', body: '111' })).toBe(false);
      expect(isMatch('0000', { title: '111', body: '000' })).toBe(false);
    });
  });
});
