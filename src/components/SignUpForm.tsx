import { Box, Button, makeStyles, Paper, TextField } from "@material-ui/core";
import { FormikValues, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { FormValue } from "../models";

const useStyles = makeStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "0.8em",
    marginBottom: "0.8em",
    padding: "0.8em",
    "& .MuiFormControl-root": {
      marginTop: "0.5em",
      marginBottom: "0.5em",
    },
    "& .MuiButton-root": {
      width: "100%",
      textAlign: "center",
    },
  },
});

const SignUpSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  passwordConfirmation: yup
    .string()
    .required("Please re-type your password.")
    .oneOf([yup.ref("password"), undefined], "Passwords must match"),
});

export interface Props {
  onSubmit: (values: FormValue[]) => void;
}

const SignUpForm: React.FC<Props> = ({ onSubmit }: Props) => {
  const classes = useStyles();
  const formik = useFormik({
    validationSchema: SignUpSchema,
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    onSubmit: (values: FormikValues) => {
      const formVals: FormValue[] = [];
      formVals.push({ key: "email", value: values.email });
      formVals.push({ key: "password", value: values.password });
      onSubmit(formVals);
    },
  });

  return (
    <Box display="flex" width="100%">
      <Paper className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <Box>
            <TextField
              id="email"
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              error={formik.errors.email !== undefined}
              helperText={formik.errors.email}
              onChange={formik.handleChange}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              error={formik.errors.password !== undefined}
              helperText={formik.errors.password}
              onChange={formik.handleChange}
            />
            <TextField
              id="passwordConfirmation"
              name="passwordConfirmation"
              label="Confirm"
              type="password"
              fullWidth
              variant="outlined"
              error={formik.errors.passwordConfirmation !== undefined}
              helperText={formik.errors.passwordConfirmation}
              onChange={formik.handleChange}
            />
            <Button color="primary" variant="contained" type="submit">
              Sign Up
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUpForm;
