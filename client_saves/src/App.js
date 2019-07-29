import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./Utils/apolloClient";

import LoginForm from "./tests/FormikForm";

// import LoginForm from "./Form";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ListItems from "./tests/listItems";
import TestMaterialUI from "./tests/testMaterialUI";
import AddItem from "./tests/addItem";
import BorrowItem from "./tests/borrowItem";
import ReturnItem from "./tests/returnItem";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <Link to='/login/'>Go To Login</Link>
    </div>
  );
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path='/' exact component={Index} />
        <Route path='/about/' component={About} />
        <Route path='/users/' component={Users} />
        <Route path='/login/' component={LoginForm} />
        <Route path='/items' component={ListItems} />
        <Route path='/testmaterialui' component={TestMaterialUI} />
        <Route path='/additem' component={AddItem} />
        <Route path='/borrowitem' component={BorrowItem} />
        <Route path='/returnitem' component={ReturnItem} />
      </Router>
    </ApolloProvider>
  );
}

export default AppRouter;
