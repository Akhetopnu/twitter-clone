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
      post_list: [],
      post_id: match.params.id,
      post_current: 0,
      post_count: 0,
    };
    this.is_streaming = false;
    this.is_mounted = true;
  }

  get list() {
    return [
      ...this.state.post_list,
      {},
    ].map(item => ({
      ...item,
      hidden: !this.isMatch(item),
    }));
  }

  async stream() {
    const post_count = await API.fetch_count();
    this.setState({
      post_count,
      post_current: post_count,
    });

    this.stream_tick();
  }

  stream_finish() {
    console.info('No more posts available.');
  }

  async stream_tick() {
    if (this.state.post_current === 0) {
      return this.stream_finish();
    }

    const post = await API.fetch_by_id(this.state.post_current);
    if (!Object.keys(post).length) {
      return this.stream_finish();
    }

    this.setState({
      post_list: [...this.state.post_list, post],
      post_current: this.state.post_current - 1,
    });

    if (!this.is_mounted || !this.is_streaming) {
      return;
    }

    setTimeout(() => {
      this.stream_tick();
    }, 2e3)
  }

  componentDidMount() {
    this.is_mounted = true;
    this.stream();
  }

  componentWillUnmount() {
    this.is_mounted = false;
  }

  render() {
    if (!auth.isAuthenticated) {
      return <Redirect to='/login' />
    }

    if (this.state.post_id) {
      this.is_streaming = false;
      return <Tweet id={this.state.post_id} />
    }

    this.is_streaming = true;
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
          { this.list.map((item, i) =>
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
