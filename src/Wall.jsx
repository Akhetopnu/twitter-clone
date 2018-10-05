import './Wall.scss';
import * as API from './api';
import React, { Component } from 'react';

class WallPost extends Component {
  render() {
    const { userId, title } = this.props.item;

    return (
      <div className='wall-content-post'>
        <h3>UserId: user{userId}</h3>
        <span>{title}</span>
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
      .then(list => this.setState({ list }));
  }

  render() {
    return (
      <div className='wall'>

        <header className='wall-header'>
          <button>Logout</button>
          <div className='wall-header-search'>
            <i>asd</i>
            <input type='text' placeholder='Search' />
          </div>
        </header>

        <div>
          <div>
            {this.state.list.map(item => <WallPost item={item} key={item.id}/>)}
          </div>
        </div>

      </div>
    );
  }
}

