import './Wall.scss';
import * as API from './api';
import React, { Component } from 'react';

class WallPost extends Component {
  render() {
    const { userId, title } = this.props.item;

    return (
      <div className='wall-content-post'>
        <div className='wall-content-post-inner'>
          <h3>UserId: user{userId}</h3>
          <span>{title}</span>
        </div>
      </div>
    );
  }
}

export default class Wall extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    API.fetch_all()
      .then(list => {
        console.log('co z ta lista:', list);
        this.setState({ list });
      });
  }

  render() {
    return (
      <div className='wall'>

        <header className='wall-header'>
          <button type='click' className='wall-header-button-logout'>Logout</button>
          <div className='wall-header-search'>
            <i>asd</i>
            <input type='text' placeholder='Search' />
          </div>
        </header>

        <main className='wall-content'>
          {this.state.list.map(item => <WallPost item={item} key={item.id}/>)}
        </main>

      </div>
    );
  }
}

