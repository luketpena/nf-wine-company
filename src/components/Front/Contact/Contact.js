import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';

import FrontLanding from '../FrontLanding';

const Container = styled.div``;

const ContactBox = styled.div`

  margin-bottom: 128px;

  h2 {
    color: var(--col-primary);
    font-size: 2em;
  }

  form {

    max-width: 500px;
    margin: 0 auto;

    input, textarea, select {
      display: block;
      width: 100%;
      resize: none;
      margin-bottom: 8px;
      outline: none;
      border: none;
      border-radius: 4px;
      padding: 8px;
      background-color: #EEE;
      border: 1px solid #CCC;

      font-family: var(--font-paragraph);
      font-size: 1em;
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
  let [type, setType] = useState(0);

  let [sent, setSent] = useState(false);

  function sendEmail(event) {
    event.preventDefault();
    const newEmail = {name,subject,email,type,message};
    dispatch({type: "CONTACT_SEND_EMAIL", payload: newEmail});
    setSent(true);
  }

  function renderContent() {
    if (sent) {
      return (
        <div className="sec-default-content">
          <h2>Thank you!</h2>
        </div>
      )

    } else {
      return (
        <div className="sec-default-content">
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
            <select required value={type} onChange={event=>setType(event.target.value)}>
              <option disabled value={0}>Select Customer Type</option>
              <option value={1}>Trade Partner</option>
              <option value={2}>Public</option>
            </select>
            <textarea
              required
              placeholder="Message"
              value={message}
              onChange={event=>setMessage(event.target.value)}
              />
            <button className="button-front">Send</button>

          </form>
        </div>
      )
    }
  }

  return (
    <Container>
      <FrontLanding 
        title="Contact Us"
        text={["We want to hear from you."]}/>
      <ContactBox className="sec-default">
        {renderContent()}
      </ContactBox>
    </Container>
  )
}