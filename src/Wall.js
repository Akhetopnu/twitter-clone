import React, { Component } from 'react';
import * as API from './api';

class WallPost extends Component {
  render() {
    const { userId, title } = this.props.item;

    return (
      <div>
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
      <div>

        <div>
          <button>Logout</button>
          <div>
            <i>asd</i>
            <input type='text' placeholder='Search' />
          </div>
        </div>

        <div>
          <div>
            {this.state.list.map(item => <WallPost item={item} key={item.id}/>)}
          </div>
        </div>

      </div>
    );
  }
}

