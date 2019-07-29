import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
/*
1) Setup constructor
2) Examine this.props.navigation
3) onsubmit function programmatically navigates to another page via button component

*/
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: ""
    };
    console.log("PROPS:", props.history);
    this.handleChange = this.handleChange.bind(this);
  }

  //  function{
  //      this.props.navigation
  //  }
  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  }

  render() {
    return (
      <section>
        {/* {console.log(this.props.navigation)} */}
        <form>
          <input
            name='firstName'
            placeholder='First name'
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <h4>{this.state.firstName}</h4>
          <input
            placeholder='Last name'
            value={this.state.lastName}
            onChange={e => this.setState({ lastName: e.target.value })}
          />
          <input
            placeholder='Username'
            value={this.state.username}
            onChange={e => this.setState({ userName: e.target.value })}
          />
          <input
            placeholder='Email'
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            placeholder='Password'
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </form>
        <Link to='/about/'>Go To About Page</Link>
        <button
          type='Submit'
          onClick={e => {
            console.log(this.props);
            this.props.history.push("/users/", undefined);
          }}
        >
          Submit
        </button>
      </section>
    );
  }
}

export default Form;
