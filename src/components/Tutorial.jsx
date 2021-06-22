import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/styles";

export default function Tutorial(props) {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.cardContainer}>
                <CardHeader
                    title={props.videoTitle}
                    subheader={props.tags.map(tag => "#" + tag + " " )}
                    style={{ textAlign: "center" }} 
                />
                <CardContent>
                    <p>Teacher Name: {props.teacherName}</p>
                    <a href={props.videoUrl}>Loading video...</a>
                    <p>Rating: {props.averageUserRating}</p>
                </CardContent>
            </Card>
        </div>
    );
}

const useStyles = makeStyles({
    cardContainer: {
        padding: ".5rem",
        marginBottom: "10px",
        width: 380,
        margin: "0 auto",
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
        },
    },
  });
  