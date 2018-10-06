import './Wall.scss';
import * as API from './api';
import React, { Component } from 'react';
import WallPost from './WallPost.jsx';
import { BrowserRouter as Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export class Wall extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      search: '',
    };
  }

  componentDidMount() {
    API.fetch_all()
      .then(list => {
        if (list.length % 3) {
          list.push(
            ...Array.from({
              length: 3 - (list.length % 3),
            }).map(() => ({})),
          );
        }

        this.setState({ list });
      });
  }

  render() {
    return (
      <div className='wall'>

        <header className='wall-header'>
          <a className='wall-header-button-logout' type='button' href='/logout'>Logout</a>
          <div className='wall-header-search'>
            <FontAwesomeIcon className='wall-header-search-icon' icon={faSearch} />
            <input type='text' placeholder='Search' onInput={this.search.bind(this)}/>
          </div>
        </header>

        <main className='wall-content'>
          { this.state.list
              .filter(this.isMatch, this)
              .map((item, i) =>
                <WallPost item={item} key={i} />
              )
          }
        </main>
      </div>
    );
  }

  isMatch(item) {
    const { search } = this.state;

    return !search || (
      (item.title && item.title.includes(search))
        ||
      (item.body && item.body.includes(search))
    );
  }

  search(event) {
    this.setState({
      search: event.target.value,
    });
  }
}

export const WallContainer = ({ match }) => (
  <div>
    <Route exact path={match.url} component={Wall} />
  </div>
);
