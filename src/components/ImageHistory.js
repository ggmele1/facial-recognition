import React from 'react';
import {
    Container,
    Card,
    CardMedia,
    Grid,
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";

  const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    }
  }));



  const ImageHistory = (props) => {
      const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const classes = useStyles();
    return (
        <Container className={classes.cardGrid} maxWidth="md">

        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
}

export default ImageHistory;