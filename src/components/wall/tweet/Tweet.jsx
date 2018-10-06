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
      exists: false,
    }
  }
  async fetch() {
    const post = await API.fetch_by_id(this.state.id)
      .catch(console.error);
    if (!post) {
      this.setState({
        exists: false,
      });
    }

    this.setState({ post });
  }

  componentWillMount() {
    this.fetch();
  }

  render() {
    const { post } = this.state;
    return (
      <div className='post'>
        <header className='post-header'>
          <Link to='..' className='post-header-back'>
            <button>Go back</button>
          </Link>
        </header>

      {!this.exists
        ? <PopupError
            title='404 Not found'
            message='Sorry, we could not find post with an id of 0.'
          />
        : this.state.post
          ?
            <div>
              <p><b>UserId:</b> userId{post.userId}</p>
              <p><b>Id:</b> {post.id}</p>
              <p><b>Title:</b> {post.title}</p>
              <p><b>Body:</b> {post.body}</p>
            </div>
          :
            <h2>Loading...</h2>
      }
      </div>
    );
  }
}
