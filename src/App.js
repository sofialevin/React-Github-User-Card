import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {}
    };
  }

  componentDidMount() {
    fetch("https://api.github.com/users/sofialevin")
      .then(res => res.json())
      .then(user => this.setState({
        userData: user
      }))
      .catch(err => console.log("noooo: ", err));
  }

  render() { 
    return (
      <div></div>
    );
  }
}
 
export default App;
