/**
 * Title: Send Message  
 * @author - Sagarkumar Pankajbhai Vaghasia
 * Availability: https://mui.com/material-ui/getting-started/overview/
 *               https://reactjs.org/docs/hooks-effect.html
 *               https://www.npmjs.com/package/uuid
 *               https://bobbyhadz.com/blog/react-merge-inline-styles#:~:text=Use%20the%20spread%20syntax%20to,get%20applied%20to%20the%20element.
 *               https://www.freecodecamp.org/news/pass-data-between-components-in-react/#:~:text=First%2C%20you'll%20need%20to,one%20parent%20and%20one%20child.&text=Next%2C%20you'll%20import%20the,parent%20component%20and%20return%20it.&text=Then%20you'll%20create%20a,Hook%20to%20manage%20the%20data
 *               https://bobbyhadz.com/blog/react-map-is-not-a-function
 *               https://stackoverflow.com/questions/47616355/foreach-in-react-jsx-does-not-output-any-html
 *               https://stackoverflow.com/questions/46000360/use-of-then-in-reactjs
 */




import { addDoc, collection, doc, getDoc, setDoc, Timestamp} from "firebase/firestore";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

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
  
  //This function is used to send message to the firebase.
  function SendMessage(props) {
    
    const [msg, setMessage] = useState("");
    const params = useParams()
    const collectionRef = collection(db, `chats/${params.id}/Messages`);
  
    async function sendMessage(e) {
      
      e.preventDefault();
  
      const documentRef = doc(db, "chats", `${params.id}`);
      const documentSnap = await getDoc(documentRef);
      console.log(documentSnap)
      console.log(documentSnap.exists())
  
      if (documentSnap.exists()) {
        addDoc(collectionRef, {
          message: msg,
          timestamp: Timestamp.now(),
          sender: localStorage.getItem('userName'),
        });
      } else {
        setDoc(documentRef, {
          customerName: "customerName",
          customerEmail: "customerEmail",
          resturentName: "resturentName",
          resturentEmail: "resturentEmail",
          customerComplaint: "customerComplaint",
          compalintStatus: true,
          chatRoomCreatedAt: Timestamp.now(),
        }).then(
          addDoc(collectionRef, {
            message: msg,
            timestamp: Timestamp.now(),
            sender: localStorage.getItem('userName'),
          })
        );
      }
  
      setMessage("");

    }
  
    return (
      <div>
        <form onSubmit={sendMessage}>
          <FloatingLabel controlId="floatingTextarea2" label="">
            <Form.Control
              value={msg} onChange={(e) => setMessage(e.target.value)} as="textarea"
              placeholder="Enter message"
              style={{ height: "30px" }}
            />
          </FloatingLabel>
          <Button type="submit" variant="dark"> Send </Button>
        </form>
      </div>
    );
  }
  
  export default SendMessage;