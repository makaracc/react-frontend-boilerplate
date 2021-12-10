import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
} from "../../../../node_modules/@mui/material/index";
import axios from "../../../../node_modules/axios/index";
export const Comprehend = () => {
  const [inputText, SetInputText] = useState("");
  const [sentiment, SetSentiment] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:1337/comprehend")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getSentiment = () => {
    fetch("http://localhost:1337/comprehend", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: inputText,
      }),
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        SetSentiment(data.Sentiment);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    SetInputText(event.target.value);
  };

  const view = (
    <Box
      style={{
        margin: "50px",
      }}
      sx={{
        width: 1000,
        heigh: 1000,
        maxWidth: "50%",
      }}
    >
      <TextField
        onChange={handleChange}
        fullWidth
        label="fullWidth"
        id="Input text"
      />
      <br />
      <br />
      <Button variant="contained" onClick={getSentiment}>
        Get Sentiment
      </Button>

      <h1>{sentiment}</h1>
    </Box>
  );
  return view;
};
