import './Post.scss'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as API from './api';

export class Post extends Component {
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
        ? <p>Title: {this.state.post.title}</p>
        : <h2>Loading...</h2>
      }
      </div>
    );
  }
}
