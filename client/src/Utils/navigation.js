import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { AppBar, Toolbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const useStyles = theme => ({
  root: {
    flexGrow: 1
  },
  appBarItem: {
    textAlign: "right",
    fontSize: 20,
    marginRight: theme.spacing(2)
  }
});

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <AppBar position='static'>
            <Toolbar>
              <Link to='/'>
                <Button color='inherit' className={classes.appBarItem}>
                  Home
                </Button>
              </Link>
              <Link to='/login'>
                <Button color='inherit' className={classes.appBarItem}>
                  Signup
                </Button>
              </Link>

              <Button color='inherit' className={classes.appBarItem}>
                Login
              </Button>
              <Button color='inherit' className={classes.appBarItem}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(Navigation);
