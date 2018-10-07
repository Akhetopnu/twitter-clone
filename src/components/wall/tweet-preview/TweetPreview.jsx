import './TweetPreview.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class TweetPreview extends Component {
  render() {
    const { userId, title, id, hidden } = this.props.item;
    const klass = 'tweet-preview' + (hidden ? ' --hidden' : '');
    if (!userId || !title || !id) {
      return <div className='tweet-preview hidden'></div>;
    }

    return (
      <Link className={klass} to={'/wall/' + id}>
        <h2>UserId: {userId}</h2>
        <span>{title}</span>
      </Link>
    );
  }
}
