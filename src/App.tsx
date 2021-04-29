import React, { useState } from "react";
import { FormValue } from "./models";
import SignUpForm from "./components/SignUpForm";
import PrettyPrint from "./components/PrettyPrint";
import { AppBar, Box, makeStyles, Tab, Tabs } from "@material-ui/core";
import ExpenseForm from "./components/ExpenseForm";

const useStyles = makeStyles({
  root: {
    background: "black",
    height: "100vh",
  },
});

function App() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormValue[]>();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
        >
          <Tab label="Example One" />
          <Tab label="Example Two" />
        </Tabs>
      </AppBar>
      {currentTab === 0 && (
        <SignUpForm onSubmit={(values) => setFormValues(values)} />
      )}
      {currentTab === 1 && (
        <ExpenseForm onSubmit={(values) => setFormValues(values)} />
      )}

      <Box
        display="flex"
        width="100vw"
        minHeight="250px"
        maxHeight="250px"
        overflow="auto"
        position="fixed"
        bottom="0px"
      >
        <PrettyPrint values={formValues} />
      </Box>
    </div>
  );
}

export default App;
