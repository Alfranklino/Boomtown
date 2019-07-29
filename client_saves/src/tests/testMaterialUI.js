import React, { Fragment, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

const useStyles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
});

class testMaterialUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      checkedState: true
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  // handleSwitch(event, value) {

  // }
  render() {
    const { classes } = this.props;

    const value = this.state.value;
    return (
      <Fragment>
        <h1 className={classes.redBackground}>Test Material UI Here</h1>
        <form className={classes.container} noValidate autoComplete='off'>
          <TextField
            id='outlined-dense-multiline'
            label='Dense multiline'
            className={clsx(classes.textField, classes.dense)}
            margin='dense'
            variant='outlined'
            multiline
            rowsMax='4'
          />

          <FormControlLabel
            control={
              <Switch
                checked={this.checkedState}
                // onChange={handleSwitch("checkedA")}
                value='checkedA'
              />
            }
            label='Secondary'
          />
        </form>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(testMaterialUI);
