import React, { Component, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import blueGrey from "@material-ui/core/colors/blueGrey";
import lightBlue from "@material-ui/core/colors/lightBlue";

export const homeStyles = theme => ({
  header1: {
    color: lightBlue[900],
    textAlign: "center",
    marginBottom: theme.spacing(10)
  },
  bodyText: {
    fontSize: 40,
    color: blueGrey[800],
    textAlign: "center"
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    textAlign: "center"
  }
});
