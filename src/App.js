import React from 'react';
import { Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import UserCard from './components/UserCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      follower: "",
      userData: {},
      followers: []
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/users/sofialevin")
      .then(res => res.json())
      .then(user => this.setState({
        userData: user
      }))
      .then(
        fetch("https://api.github.com/users/sofialevin/followers")
        .then(res => res.json())
        .then(followers => this.setState({
          followers: followers
        }))
      )
      .catch(err => console.log("noooo: ", err));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.follower !== this.state.follower) {
      fetch(`https://api.github.com/users/${this.state.follower}`)
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

  updateUser = (user) => {
    this.setState({
      user: user
    })
  }

  render() { 
    console.log(this.state.userData)
    return (
      <div>
        <Route exact path="/" render={() => <UserCard userData={this.state.userData} followers={this.state.followers} updateUser={this.updateUser}/>} />
        <Route path="/:user" render={() => <UserCard userData={this.state.userData} followers={this.state.followers} />} />
      </div>
    );
  }
}
 
export default App;
