import React from 'react';
import { Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import UserCard from './components/UserCard';
import Followers from './components/Followers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "sofialevin",
      userData: {},
      followers: []
    };
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.state.user}`)
      .then(res => res.json())
      .then(user => this.setState({
        userData: user
      }))
      .then(
        fetch(`https://api.github.com/users/${this.state.user}/followers`)
        .then(res => res.json())
        .then(followers => this.setState({
          followers: followers
        }))
      )
      .catch(err => console.log("noooo: ", err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      fetch(`https://api.github.com/users/${this.state.user}`)
        .then(res => res.json())
        .then(user => this.setState({
          userData: user
        }))
        .then(
          fetch(`https://api.github.com/users/${this.state.user}/followers`)
          .then(res => res.json())
          .then(followers => this.setState({
            followers: followers
          }))
        )
        .catch(err => console.log("noooo: ", err));
    }
  }

handleClick = (user) => {
  this.setState({
    user: user
  })
}


  render() { 
    console.log(this.state.userData)
    return (
      <div>
        <Route exact path="/" render={() => <UserCard userData={this.state.userData} followers={this.state.followers} handleClick={this.handleClick}/>}/>
        <Route path={`/followers/${this.state.userData.login}`} render={() => <Followers followers={this.state.followers}/>}/>
      </div>
    );
  }
}
 
export default App;
