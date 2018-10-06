import './Tweet.scss'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PopupError } from '../../popup-error/PopupError.jsx';
import * as API from '../../../services/api';

export class Tweet extends Component {
  constructor({ id }) {
    super();

    this.state = {
      id,
      post: undefined,
      is_loading: true,
    }
  }
  async fetch() {
    const post = await API.fetch_by_id(this.state.id)
      .catch(console.error);

    this.setState({
      post,
      is_loading: false,
    });
  }

  componentWillMount() {
    this.fetch();
  }

  message404() {
    return `Sorry, we could not find post with an id of ${this.state.id}.`;
  }

  render() {
    const { post } = this.state;
    let view;
    if (this.state.is_loading) {
      view = <h2>Loading...</h2>;
    }
    else if (!this.state.post) {
      const message =
        `Sorry, we could not find post with an id of ${this.state.id}.`;
      view =
        <PopupError
          title='404 Not found'
          message={message}
        />;
    } else {
      view =
        <div>
          <p><b>UserId:</b> userId{post.userId}</p>
          <p><b>Id:</b> {post.id}</p>
          <p><b>Title:</b> {post.title}</p>
          <p><b>Body:</b> {post.body}</p>
        </div>
    }

    return (
      <div className='post'>
        <header className='post-header'>
          <Link to='..' className='post-header-back'>
            <button>Go back</button>
          </Link>
        </header>

        {view}

      </div>
    );
  }
}
