import './TweetPreview.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

export class TweetPreview extends Component {
  render() {
    const { userId, title, id, hidden } = this.props.item;
    const klass = 'tweet-preview' + (hidden ? ' --hidden' : '');

    return userId && title && id
      ?
        <Link className={klass} to={'/wall/' + id}>
          <h2>{userId ? 'UserId: ' + userId : ''}</h2>
          <span>{title || ''}</span>
        </Link>
      :
        <div className='tweet-preview hidden'></div>
  }
}
