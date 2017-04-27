import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
//import RepoListEntry from './components/RepoListEntry.jsx';
import ajaxPost from './helpers/post.jsx';
import ajaxGet from './helpers/get.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.fetch = this.fetch.bind(this);
    this.search = this.search.bind(this);
    this.updateState =this.updateState.bind(this);

    this.fetch();
  }

  fetch(){
    ajaxGet(this.updateState);
  }

  updateState (data) {
    console.log('Updating state: ', data);
    this.setState({repos: data});
  }

  search (term) {
    console.log(`${term} was searched`);
    ajaxPost(term, this.fetch);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));