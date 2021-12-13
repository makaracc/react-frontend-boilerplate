import { useState, useEffect } from "react";
import { Box } from "../../../../node_modules/@mui/material/index";
import { Launcher } from "react-chat-window";
import { API } from "helpers/index";

export const Comprehend = () => {
  const [messageCount, setMessageCount] = useState(0);
  const [isMessageOpen, setIsMessageOpen] = useState(false);

  // Chat
  const [messageList, setMessageList] = useState([]);
  const onMessageWasSent = (message) => {
    if (message === null) return;
    setMessageList([...messageList, message]);
  };

  // Create The left side of the message (Respond from bot)
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

  // handle the click on chat bubble and clear notification.
  const handleChatClick = () => {
    setIsMessageOpen(!isMessageOpen);
    setMessageCount(0);
  };

  // Get Comprehend
  useEffect(() => {
    API.getComprehend();
  }, []);

  // Run everytime messageList got updated
  // Call for Sentiment API to get the Sentiment for given text (chat from me)
  useEffect(() => {
    if (messageList === null) return;
    if (messageList.length === 0) return;
    try {
      if (messageList.at(-1).author === "me") {
        getSentiment(messageList.at(-1).data.text);
      }
    } catch (e) {
      console.log(e);
    }
  });

  // POST text to API and get the Sentiment back and put in chat
  const getSentiment = async (text) => {
    const sentiment = await API.postComprehendMessage(text);
    if (sentiment === null) return;
    let resText = "";
    switch (sentiment) {
      // 😀😡😟🤡😑😵‍💫
      case "POSITIVE":
        resText = `${sentiment} 😀`;
        break;
      case "NEGATIVE":
        resText = `${sentiment} 😟`;
        break;
      case "MIXED":
        resText = `${sentiment} 😵‍💫`;
        break;
      case "NEUTRAL":
        resText = `${sentiment} 😑`;
        break;
      default:
        resText = `Received! 😬 👍`;
        console.log("Sentiment not set!");
    }
    sendMessage(`${resText}`);
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
    </Box>
  );
  return view;
};
