import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { FormValue } from "../models";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export interface Props {
  values?: FormValue[];
}

const PrettyPrint: React.FC<Props> = ({ values }: Props) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div>
        {values ? (
          <pre>{JSON.stringify(values, null, 2)}</pre>
        ) : (
          <Typography variant="body1">Nothing to print ...</Typography>
        )}
      </div>
    </Paper>
  );
};

export default PrettyPrint;
