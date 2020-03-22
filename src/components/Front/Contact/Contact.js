import React, {useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const Landing = styled.div`
  padding: 128px 16px;
`;

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

  let [name, setName] = useState('');
  let [subject, setSubject] = useState('');
  let [email, setEmail] = useState('');
  let [message, setMessage] = useState('');

  return (
    <Container>
      <Landing>
        <h1>Contact</h1>
      </Landing>
      <ContactBox className="sec-default">
        <form>
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
            value={email}
            onChange={event=>setEmail(event.target.value)}
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