import { useState, useEffect } from "react";
import {
  Box,
  // Button,
  // TextField,
} from "../../../../node_modules/@mui/material/index";
import axios from "../../../../node_modules/axios/index";
import { Launcher } from "react-chat-window";

export const Comprehend = () => {
  // const [inputText, SetInputText] = useState("");
  // const [inputMessage, SetInputMessage] = useState("");
  // const [sentiment, SetSentiment] = useState();
  const [messageCount, setMessageCount] = useState(0);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  // let messageToGetSentiment = "";

  // Chat
  const [messageList, setMessageList] = useState([]);
  const onMessageWasSent = async (message) => {
    if (message === null) return;
    // messageToGetSentiment = message;
    // setMessageList([...messageList, message]);
    new Promise (()=> { setMessageList([...messageList, message]);});
    try {
      const text = message.data.text;
      await getSentiment(text);
    } catch (e) {
      console.log(e);
    }
    
  };
  const sendMessage = (msg) => {
    const text = msg;
    if (text.length > 0) {
      setMessageCount(messageCount + 1);
      setMessageList([
        ...messageList,
        {
          author: "them",
          type: "text",
          data: { text },
        },
      ]);
    }
  };
  const handleChatClick = () => {
    setIsMessageOpen(!isMessageOpen);
    setMessageCount(0);
    getSentiment("hi");
  };

  //
  useEffect(() => {
    axios
      .get("http://localhost:1337/comprehend")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getSentiment = async (text) => {
    await fetch("http://localhost:1337/comprehend", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        // SetSentiment(data.Sentiment);
        sendMessage(data.Sentiment);
        // console.log(data);
      })
      .catch((err) => console.log(err));
  };
  // const handleChange = (event) => {
  //   SetInputText(event.target.value);
  // };
  // const handleMessageChange = (event) => {
  //   SetInputMessage(event.target.value);
  // };

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
      {/* <TextField
        onChange={handleChange}
        fullWidth
        label="fullWidth"
        id="Input text"
      /> */}
      {/* <br />
      <br />
      <Button variant="contained" onClick={getSentiment}>
        Get Sentiment
      </Button> */}

      {/* <h1>{sentiment}</h1> */}
      {/* <h1>{inputMessage}</h1> */}
      {/* <TextField
        onChange={handleMessageChange}
        fullWidth
        label="their message"
        id="Input text"
      />
      <br /> */}

      <Launcher
        agentProfile={{
          teamName: "Sentiment Chat Bot XD",
          imageUrl:
            "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
        }}
        onMessageWasSent={onMessageWasSent}
        messageList={messageList}
        newMessagesCount={messageCount}
        handleClick={handleChatClick}
        isOpen={isMessageOpen}
        showEmoji
      />
      {/* <Button variant="contained" onClick={sendMessage}>
        Send Message
      </Button> */}
    </Box>
  );
  return view;
};
