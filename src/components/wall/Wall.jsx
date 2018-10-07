import './Wall.scss';
import * as auth from '../../services/auth';
import * as actions from '../../store/actions';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { PopupError } from '../popup-error/PopupError.jsx';
import { TweetPreview } from './tweet-preview/TweetPreview.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Tweet } from './tweet/Tweet.jsx';
import { connect } from 'react-redux';
import { store } from '../../store';

class $Wall extends Component {
  get list() {
    return [...this.props.posts.list, {}].map(item => ({
      ...item,
      hidden: !this.isMatch(item),
    }));
  }

  constructor({ match }) {
    super();

    this.state = {
      search: '',
      post_id: +match.params.id,
    };

    this.is_streaming = false;
    this.is_mounted = true;
    this.timer = NaN;
    this.store_unsubscribe = store.subscribe(() => {
      const { next } = store.getState().posts;
      if (this.is_mounted && this.is_streaming) {
        if (next) {
          this.timer = setTimeout(() => {
            this.props.postGet(next);
          }, 2e3);
        } else {
          console.info('No more posts available.');
        }
      }
    });
  }

  componentWillReceiveProps({ match }) {
    this.is_mounted = this.is_streaming = !match.params.id;
    if (!this.is_streaming) {
      clearTimeout(this.timer);
    }

    this.setState({
      post_id: +match.params.id,
    });
  }

  componentDidMount() {
    if (this.state.post_id) {
      return;
    }

    if (store.getState().posts.next === undefined) {
      return void this.props.postGetCount();
    }
    if (this.props.posts.next <= 0) {
      return console.log('wall mounted but no more posts to fetch.');
    }

    this.props.postGet(this.props.posts.next);
  }

  componentWillUnmount() {
    this.is_mounted = false;
    this.store_unsubscribe();
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

        {Number.isNaN(this.props.posts.next) &&
          <PopupError
            title='Network problem'
            message='There seems to be a connectivity issue. Please try again later.'
            on_click={() => { console.log('sup'); }}
          />

        }

      </div>
    );
  }

  isMatch(post) {
    const { title, body } = post;
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

export const Wall = connect(state => ({
  posts: state.posts,
}), {
  postGet: actions.get,
  postGetCount: actions.getCount,
})($Wall);
