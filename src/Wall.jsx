import './Wall.scss';
import * as API from './api';
import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import WallPost from './WallPost.jsx';
import { Post } from './Post.jsx';


export class Wall extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
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
            <i>asd</i>
            <input type='text' placeholder='Search' />
          </div>
        </header>

        <main className='wall-content'>
          { this.state.list.map((item, i) => <WallPost item={item} key={i}/>) }
        </main>
      </div>
    );
  }
}

export const WallContainer = ({ match }) => (
  <div>
    <Route exact path={match.url} component={Wall} />
  </div>
);
