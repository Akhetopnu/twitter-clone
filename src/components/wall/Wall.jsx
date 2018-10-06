import './Wall.scss';
import * as API from '../../services/api';
import * as auth from '../../services/auth';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TweetPreview } from './tweet-preview/TweetPreview.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Tweet } from './tweet/Tweet.jsx';

export class Wall extends Component {
  constructor({ match }) {
    super();

    this.state = {
      list: [],
      search: '',
      post_id: match.params.id,
    };
  }

  componentDidMount() {
    this.is_mounted = true;
    API.fetch_all()
      .then(list => {
        if (!this.is_mounted) {
          return;
        }

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

  componentWillUnmount() {
    this.is_mounted = false;
  }

  render() {
    if (!auth.isAuthenticated) {
      return <Redirect to='/login' />
    }

    if (this.state.post_id) {
      return <Tweet id={this.state.post_id} />
    }

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
                <TweetPreview item={item} key={i} />
              )
          }
        </main>

      </div>
    );
  }
  componentWillReceiveProps({ match: { params: { id } } }) {
    if (id) {
      this.setState({
        post_id: id,
      });
    }
  }

  isMatch({ title, body }) {
    const { search } = this.state;

    return !search || (!title && !body) || (
      (title && title.includes(search))
        ||
      (body && body.includes(search))
    );
  }

  search(event) {
    this.setState({
      search: event.target.value,
    });
  }
}
