/**
 * Title: Card Component To Show the Different Features
 * Author: Sri Ramya Basam
 * Date: 2022/11/09
 * Availability: https://mui.com/material-ui/getting-started/overview/
 */
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(3),
      },
    },
  })
);

function App() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Card>
        <CardContent>
          <Typography variant="h3">Card Title</Typography>
        </CardContent>
        <CardActions>
          <Button>share</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default App;