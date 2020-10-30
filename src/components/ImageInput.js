import React, { useState } from "react";
import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "5cc74d8945d6433b962ecdab75bfbe64",
});

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100%",
    flexDirection: "column",
  },
  input: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    textAlign: "center",
  },
  button: {
    maxWidth: 150,
  },
}));

const ImageInput = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [celebrityFound, setCelebrityFound] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageDisplay, setImageDisplay] = useState("");

  const [box, setBox] = useState("");

  const getCelebrityName = () => {
    const celebritiesFound = [];
    app.models
      .predict(Clarifai.CELEBRITY_MODEL, imageUrl)
      .then((response) => {
        let facesFound = response.outputs[0].data.regions;
        const getFaces = facesFound.filter((num) => {
          return num.value > 0.99 && num.data.concepts[0].value > 0.2;
        });
        getFaces.map((face) => {
          return celebritiesFound.push(face.data.concepts[0].name.toString());
        });
        setCelebrityFound(celebritiesFound);
        setIsSuccess(true);
        setImageDisplay(imageUrl);
        getFaceBox();
      })
      .catch((err) => setIsSuccess(false));
  };

  const getFaceBox = () => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
      .then((response) => {
        console.log(response);
        displayBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace);
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayBox = (box) => {
    setBox(box);
  };
  const classes = useStyles();
  return (
    <Container className={classes.main}>
      <Grid container spacing={2} className={classes.input}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Grid>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => getCelebrityName()}
        >
          Submit
        </Button>
      </Grid>
      {celebrityFound.map((name) => (
        <Typography key={name}>{name}</Typography>
      ))}
      <div className={classes.imageWrapper}>
        {isSuccess ? (
          <div>
            <img
              src={imageDisplay}
              id="inputimage"
              alt="celebrity"
              width="500px"
              height="auto"
            />
            <div
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          </div>
        ) : null}
      </div>
    </Container>
  );
};
export default ImageInput;
