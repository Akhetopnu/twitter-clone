import './Tweet.scss'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as API from '../../api';

export class Tweet extends Component {
  constructor({ match }) {
    super();

    this.state = {
      id: match.params.id,
      post: undefined,
    }
  }
  componentWillMount() {
    API
      .fetch_by_id(this.state.id)
      .then(post => {
        setTimeout(() => {
          this.setState({ post });
        }, 300);
      });
  }

  render() {
    return (
      <div className='post'>
        <header className='post-header'>
          <Link to='.' className='post-header-back'>
            <button>Go back</button>
          </Link>
        </header>

      {this.state.post
        ?
          <div>
            <p><b>UserId:</b> userId{this.state.post.userId}</p>
            <p><b>Id:</b> {this.state.post.id}</p>
            <p><b>Title:</b> {this.state.post.title}</p>
            <p><b>Body:</b> {this.state.post.body}</p>
          </div>
        :
          <h2>Loading...</h2>
      }
      </div>
    );
  }
}
