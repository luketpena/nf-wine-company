import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import FrontLanding from '../FrontLanding';

const Container = styled.div``;

const ContactBox = styled.div`

  margin-bottom: 128px;

  form {

    max-width: 500px;
    margin: 0 auto;

    input, textarea {
      display: block;
      width: 100%;
      resize: none;
      margin-bottom: 8px;
      outline: none;
      border: none;
      border-radius: 4px;
      padding: 8px;
      background-color: #EEE;
    }

    textarea {
      height: 300px;
    }

    button {
      display: block;
      margin: 0 auto;
      font-size: 1.5em;
    }
  }
`;

export default function Contact() {

  const dispatch = useDispatch();

  let [name, setName] = useState('');
  let [subject, setSubject] = useState('');
  let [email, setEmail] = useState('');
  let [message, setMessage] = useState('');

  function sendEmail(event) {
    event.preventDefault();
    const newEmail = {name,subject,email,message};
    dispatch({type: "CONTACT_SEND_EMAIL", payload: newEmail});
  }

  return (
    <Container>
      <FrontLanding 
        title="Contact Us"
        text="We want to hear from you."/>
      <ContactBox className="sec-default">
        <form onSubmit={event=>sendEmail(event)}>
          <input
            required
            type="text"
            placeholder="Name"
            value={name}
            onChange={event=>setName(event.target.value)}
            />
          <input
            required
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={event=>setSubject(event.target.value)}
            />
          <input
            required
            type="email"
            placeholder="email@place.com"
            value={email}
            onChange={event=>setEmail(event.target.value)}
            />
          <textarea
            required
            placeholder="Message"
            value={message}
            onChange={event=>setMessage(event.target.value)}
            />
          <button className="button-front">Send</button>

        </form>

      </ContactBox>
    </Container>
  )
}