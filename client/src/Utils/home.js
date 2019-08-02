import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { Grid } from "@material-ui/core";
import { homeStyles } from "./boomtownStyles";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant='h1' component='h2' gutterBottom className={classes.header1}>
          Boomtown
        </Typography>
        <div>
          <Typography className={classes.bodyText}>
            Boomtown is the place to be if you want to share and borrow whatever you want. Let's
            come for curiousity and stay by conviction!
          </Typography>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(homeStyles)(Home);
