import React, { Component, Fragment } from "react";
import { Formik, Field, Form, ErrorMessage, yupToFormErrors } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";

const POST_ITEM = gql`
  mutation postItem($itemInfo: PostItemInput!) {
    postItem(itemInfo: $itemInfo) {
      id
      name
      description
    }
  }
`;
// In order to be able to concat (see the function with the same name below),
//We have to ensure that both postItem and listMyItems have the same outputs.
//In this case: id, name, description

const LIST_MY_ITEMS = gql`
  query listMyItems {
    listMyItems {
      id
      name
      description
    }
  }
`;

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  render() {
    return (
      <Fragment>
        <main>
          <h1>Add a new Component here...</h1>
        </main>

        <Mutation
          mutation={POST_ITEM}
          update={(cache, response) => {
            console.log("Test:", response);
            const infos = cache.readQuery({ query: LIST_MY_ITEMS });
            console.log("Infos:", infos);
            cache.writeQuery({
              query: LIST_MY_ITEMS,
              data: { listMyItems: infos.listMyItems.concat([response.data.postItem]) }
            });
            console.log("New Infos", infos);
          }}
        >
          {(postItem, { loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error: ${error.message}`;

            return (
              <Formik
                initialValues={{
                  name: "",
                  description: ""
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required("You should give a name to that item"),
                  description: Yup.string()
                })}
                onSubmit={(values, { setSubmitting }) => {
                  alert(JSON.stringify(values, null, 2));
                  postItem({ variables: { itemInfo: values } });
                  setSubmitting(false);

                  this.setState({
                    name: values.name
                  });
                }}
              >
                {({ errors, status, touched, values, handleChange, handleBlur, handleSubmit }) => (
                  <div className='container'>
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
                        id='description'
                        label='Description'
                        className='test'
                        type='text'
                        margin='normal'
                        variant='filled'
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.description && errors.description && <div>{errors.description}</div>}
                      <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className='submitBtn'
                      >
                        Submit
                      </Button>
                      {/*TODO: Insert a conditional rendering here to display a different info whether the user is logged in or out.*/}
                      <h3>
                        The following product is inserted: {this.state.name}. Congratulations!.
                      </h3>
                    </form>
                  </div>
                )}
              </Formik>
            );
          }}
        </Mutation>

        <Query query={LIST_MY_ITEMS}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <div>
                {" "}
                Testing
                {data.listMyItems.map(item => (
                  <div>
                    <p>Id: {item.id}</p>
                    <p>Name: {item.name}</p>
                    <p>Description: {item.description}</p>
                  </div>
                ))}
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default AddItem;
