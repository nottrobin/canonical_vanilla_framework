import React, { Component } from "react";
import moment from 'moment';
import './App.scss';

export default class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    fetch("https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json")
    .then(response => response.json()).then(response => {
      this.setState({
          posts: response,
        });
      });
  }


  render() {
    return (
      <div className="row u-equal-height">
        {this.state.posts.map(post =>
          <div className="p-card--highlighted col-4 blog-p-card" key={post.id.toString()}>
            <header className="blog-p-card__header">
              <h4 className="p-muted-heading blog-p-card__category u-no-margin--bottom">{post._embedded["wp:term"][2][0] !== undefined ? post._embedded["wp:term"][2][0].name: "canonical"}</h4>
            </header>
            <div className="blog-p-card__content">
              <a href={post.link}>
                <img src={post.featured_media} alt="canonical"/>
              </a>
              <h3 className="blog-p-card__header">
                <a href={post.link}>{post.title.rendered}</a>
              </h3>
              <p>
                <em>By <a href={post._embedded.author[0].link}>{post._embedded.author[0].name}</a> on {moment(post.date).format('DD MMMM YYYY')}</em>
              </p>
            </div>
            <footer className="blog-p-card__footer">
              <p className="blog-p-card__type">Article</p>
            </footer>
          </div>
        )}
      </div>
    );
  }

}

