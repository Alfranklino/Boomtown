import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

import { makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const SIGNUP = gql`
  mutation signup($signupInfo: SignupInput!) {
    signup(signupInfo: $signupInfo) {
      name
      password
      email
      date_of_birth
      date_created
      location
      id
      status
    }
  }
`;

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
      //   email: "",
      //   password: ""
    };

    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <Mutation mutation={SIGNUP}>
        {(signup, { loading, error, data, client }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is ABSOLUTELY REQUIRED my Friend."),

                email: Yup.string()
                  .email("Sorry, invalid email")
                  .required("Email is ABSOLUTELY REQUIRED my Friend."),
                password: Yup.string().required("Password is ABSOLUTELY REQUIRED my Friend.")
              })}
              onSubmit={(values, { setSubmitting }) => {
                alert(JSON.stringify(values, null, 2));
                client.resetStore(); //Resetting the cache of the browser;
                signup({ variables: { signupInfo: values } });
                setSubmitting(false);

                this.setState({
                  name: values.name
                });
              }}
            >
              {({ errors, status, touched, values, handleChange, handleBlur, handleSubmit }) => (
                <div className='container'>
                  {console.log("show erors ", errors)}

                  <form className='inputsFields' onSubmit={handleSubmit}>
                    <Button color='secondary'>Logout</Button>
                    <TextField
                      id='name'
                      label='Name'
                      className='test'
                      type='text'
                      margin='normal'
                      variant='filled'
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && <div>{errors.name}</div>}{" "}
                    {/*Show errors related to nameTextfield*/}
                    <TextField
                      id='email'
                      label='Email'
                      className='test'
                      type='email'
                      margin='normal'
                      variant='filled'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && <div>{errors.email}</div>}
                    <TextField
                      id='password'
                      label='Password'
                      className='test'
                      type='password'
                      autoComplete='current-password'
                      margin='normal'
                      variant='filled'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password && <div>{errors.password}</div>}
                    <div className='checkBoxes'>
                      <Checkbox
                        //   checked={state.checkedA}
                        //   onChange={handleChange("checkedA")}
                        value='checkedA'
                        inputProps={{
                          "aria-label": "primary checkbox"
                        }}
                      />
                      <Checkbox
                        //   checked={state.checkedB}
                        //   onChange={handleChange("checkedB")}
                        value='checkedB'
                        color='primary'
                        inputProps={{
                          "aria-label": "secondary checkbox"
                        }}
                      />
                    </div>
                    <Button type='submit' variant='contained' color='primary' className='submitBtn'>
                      Submit
                    </Button>
                    {/*TODO: Insert a conditional rendering here to display a different info whether the user is logged in or out.*/}
                    <h3>Good job {this.state.name}, you are connected.</h3>
                  </form>
                </div>
              )}
            </Formik>
          );
        }}
      </Mutation>
    );
  }
}

export default LoginForm;
