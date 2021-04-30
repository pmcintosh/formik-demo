import { Box, Button, makeStyles, Paper, TextField } from "@material-ui/core";
import { FieldArray, FormikProvider, FormikValues, useFormik } from "formik";
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
      margin: "0.5em",
    },
  },
});

const NamesFormSchema = yup.object().shape({
  names: yup
    .array()
    .of(yup.string().min(3, "Must be at least three letters long."))
    .min(1, "You must enter at least one name."),
});

export interface Props {
  onSubmit: (values: FormValue[]) => void;
}

const ExpenseForm: React.FC<Props> = ({ onSubmit }: Props) => {
  const classes = useStyles();
  const formik = useFormik({
    validationSchema: NamesFormSchema,
    initialValues: {
      names: [],
    },
    onSubmit: (values: FormikValues) => {
      const formVals: FormValue[] = [];
      formVals.push({ key: "names", value: values.names });
      onSubmit(formVals);
    },
  });

  return (
    <Box display="flex" width="100%">
      <Paper className={classes.root}>
        <form onSubmit={formik.handleSubmit}>
          <FormikProvider value={formik}>
            <FieldArray name="names">
              {(helpers) => (
                <>
                  <Box
                    display="flex"
                    flexDirection="column"
                    maxHeight="50vh"
                    width="400px"
                    overflow="auto"
                  >
                    {formik.values.names.map((name, index) => (
                      <TextField
                        key={`names.${index}`}
                        id={`names.${index}`}
                        name={`names.${index}`}
                        label="Name"
                        fullWidth
                        variant="outlined"
                        error={
                          formik.errors.names !== undefined &&
                          formik.errors.names[index] !== undefined
                        }
                        helperText={
                          formik.errors.names
                            ? formik.errors.names[index]
                            : undefined
                        }
                        onChange={formik.handleChange}
                      />
                    ))}
                  </Box>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => helpers.push("")}
                  >
                    Add
                  </Button>
                </>
              )}
            </FieldArray>
          </FormikProvider>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ExpenseForm;
