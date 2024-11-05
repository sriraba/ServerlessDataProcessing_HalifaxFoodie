import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SendMessage from "./SendMessage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2eBhVitfJjFebJ__ho7mwZUk4JjdHv0Q",
  authDomain: "csci5410-groupproject-g12.firebaseapp.com",
  projectId: "csci5410-groupproject-g12",
  storageBucket: "csci5410-groupproject-g12.appspot.com",
  messagingSenderId: "541735430417",
  appId: "1:541735430417:web:8400ebd042fa3d312144b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

function Chat() {
  const params = useParams()
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const q = query(
      collection(db, `chats/${params.id}/Messages`),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages([]);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setMessages((messages) => [
          ...messages,
          {
            timestamp: doc.data().timestamp,
            text: doc.data().message,
            senderName: doc.data().sender,
            receiverName: doc.data().receiver,
          },
        ]);
      });
    });
  }

  return (
    <div>
      {messages?.reverse()?.map((data) => (
        <div key={data.timestamp}>
          {localStorage.getItem("userName") === data.senderName ? (
            <p style={{ textAlign: "right", paddingRight: "5rem" }}>
              {data.text}
            </p>
          ) : (
            <p style={{ textAlign: "left", paddingLeft: "5rem" }}>
              {data.text}
            </p>
          )}
        </div>
      ))}
      <SendMessage scroll={scroll} updateMsg={fetchData} />
      <div ref={scroll}></div>
    </div>
  );
}

export default Chat;