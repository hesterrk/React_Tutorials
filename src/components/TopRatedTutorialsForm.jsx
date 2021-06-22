import React from "react";
import { makeStyles } from "@material-ui/styles";

export default function TopRatedTutorialsForm({ changeHandler, searchTerm }) {
  const classes = useStyles();
  return (
    <div>
      <input
          placeholder="Search by tags"
          type="text"
          name="tagSearchTerms"
          value={searchTerm}
          onChange={changeHandler}
          className={classes.tagSearchTerm}
      />
    </div>
  );
}

const useStyles = makeStyles({
  tagSearchTerm: {
      width: "100%",
      border: "1px solid black",
      height: "2rem",
      margin: "0",
      padding: "6px 5px 7px",
      borderRadius: "10%"
  }
});