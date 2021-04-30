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

const ExpenseFormSchema = yup.object().shape({
  description: yup.string().required("Please enter a description."),
  amount: yup
    .number()
    .required("Please enter an amount.")
    .test(
      "maxDigitsAfterDecimal",
      "Amount must have 2 digits after decimal or less",
      (number) => /^\d+(\.\d{1,2})?$/.test(number?.toString() ?? "")
    )
    .typeError("Must be a number."),
});

export interface Props {
  onSubmit: (values: FormValue[]) => void;
}

const ExpenseForm: React.FC<Props> = ({ onSubmit }: Props) => {
  const classes = useStyles();
  const formik = useFormik({
    validationSchema: ExpenseFormSchema,
    initialValues: {
      description: "",
      amount: "0.00",
    },
    onSubmit: (values: FormikValues) => {
      const formVals: FormValue[] = [];
      formVals.push({ key: "description", value: values.description });
      formVals.push({ key: "amount", value: values.amount });
      onSubmit(formVals);
    },
  });

  return (
    <Box display="flex" width="100%">
      <Paper className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <Box width="400px">
            <TextField
              id="description"
              name="description"
              label="Description"
              fullWidth
              variant="outlined"
              error={formik.errors.description !== undefined}
              helperText={formik.errors.description}
              onChange={formik.handleChange}
            />
            <TextField
              id="amount"
              name="amount"
              label="Amount"
              fullWidth
              variant="outlined"
              error={formik.errors.amount !== undefined}
              helperText={formik.errors.amount}
              onChange={formik.handleChange}
            />
          </Box>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ExpenseForm;
