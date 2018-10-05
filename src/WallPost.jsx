import './WallPost.scss';
import React, { Component } from 'react';

export default class WallPost extends Component {
  render() {
    const { userId, title, id } = this.props.item;

    return userId && title && id
      ?
        <a className='wall-content-post' href={'/posts/' + id}>
          <div className='wall-content-post-inner'>
            <h3>{userId ? 'UserId: ' + userId : ''}</h3>
            <span>{title || ''}</span>
          </div>
        </a>
      :
        <div className='wall-content-post hidden'></div>
  }
}
