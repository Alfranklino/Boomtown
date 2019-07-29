import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Formik, Field, Form, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { Mutation } from "react-apollo";

const RETURN_ITEM = gql`
  mutation borrowItem($returnInfo: ReturnItemInput!) {
    returnItem(returnInfo: $returnInfo) {
      name
      status
      borrower_id
      id
      owner_id
    }
  }
`;

class ReturnItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: ""
    };
  }
  render() {
    return (
      <Fragment>
        <h1>Here is where to Return an item from the list</h1>

        <Mutation mutation={RETURN_ITEM}>
          {(returnItem, { loading, error, data }) => {
            if (loading) return "Loading....";
            if (error) return `Error: ${error.message}`;

            return (
              <Formik
                initialValues={{
                  id: ""
                }}
                validationSchema={Yup.object().shape({
                  id: Yup.string().required("You should give a name to that item")
                })}
                onSubmit={(values, { setSubmitting }) => {
                  alert(JSON.stringify(values, null, 2));
                  returnItem({ variables: { returnInfo: values } });
                  setSubmitting(false);

                  this.setState({
                    id: values.id
                  });
                }}
              >
                {({ errors, status, touched, values, handleChange, handleBlur, handleSubmit }) => (
                  <div className='container'>
                    <form className='inputsFields' onSubmit={handleSubmit}>
                      <Button color='secondary'>Logout</Button>
                      <TextField
                        id='id'
                        label='Product'
                        className='test'
                        type='text'
                        margin='normal'
                        variant='filled'
                        value={values.id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.id && errors.id && <div>{errors.id}</div>}{" "}
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className='submitBtn'
                      >
                        Submit
                      </Button>
                      {/*TODO: Insert a conditional rendering here to display a different info whether the user is logged in or out.*/}
                      <h3>The following product is returned: {this.state.id}. Congratulations!.</h3>
                    </form>
                  </div>
                )}
              </Formik>
            );
          }}
        </Mutation>
      </Fragment>
    );
  }
}

export default ReturnItem;
