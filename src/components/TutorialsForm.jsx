import React from "react";
import { makeStyles } from "@material-ui/styles";

export default function TutorialsForm({ changeHandler, searchTerm }) {
    const classes = useStyles();
    return (
        <div>
            <input
                placeholder="Search tutorials"
                type="text"
                name="generalSearchTerm"
                value={searchTerm}
                onChange={changeHandler}
                className={classes.generalSearchTerm}
            />
        </div>
    );
}

const useStyles = makeStyles({
    generalSearchTerm: {
        width: "100%",
        border: "1px solid black",
        height: "2rem",
        margin: "0",
        padding: "6px 5px 7px",
        borderRadius: "10%"
    }
});