import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import client from "./Utils/apolloClient";

// import LoginForm from "./Form";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import LoginForm from "./tests/FormikForm";
import ListItems from "./tests/listItems";
import TestMaterialUI from "./tests/testMaterialUI";
import AddItem from "./tests/addItem";
import BorrowItem from "./tests/borrowItem";
import ReturnItem from "./tests/returnItem";
import Home from "./Utils/home";
import Navigation from "./Utils/navigation";

function Index() {
  return <h2>Home</h2>;
}

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//       <Link to='/login/'>Go To Login</Link>
//     </div>
//   );
// }

function Users() {
  return <h2>Users</h2>;
}

const history = createHistory();

class AppRouter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <Router history={history}>
          <Navigation />
          <Switch>
            {/* <Route path='/about/' component={About} /> */}
            <Route path='/users/' component={Users} />
            <Route path='/login' component={LoginForm} />
            <Route exact path='/' component={Home} />

            <Route path='/items' component={ListItems} />
            <Route path='/testmaterialui' component={TestMaterialUI} />
            <Route path='/additem' component={AddItem} />
            <Route path='/borrowitem' component={BorrowItem} />
            <Route path='/returnitem' component={ReturnItem} />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default AppRouter;
