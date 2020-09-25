import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const UploaderBox = styled.div`
  display: flex;
  justify-content: center;
`;

export default function FileUploader() {

  const inputRef = useRef();

  const [uploading, setUploading] = useState('idle');
  const [success, setSuccess] = useState(false);

  function handleInputChange(event) {
    // Collect the files from the input event
    var files = event.target.files || event.dataTransfer.files;
    // Quit if the file isn't legit
    if (!files.length) {return;}
    // Creating the package and adding the File object to the formdata
    var formData = new FormData();
    formData.append("file", files[0]);
    // Send to the upload method
    uploadDocument(formData);
  }

  function uploadDocument(file) {
    Axios.post('/api/aws/upload', file, {
      responseType: 'arraybuffer',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/pdf'
      }
    }).then(response => {
      setSuccess(true);
    }).catch(error => {
      setSuccess(false);
    }).finally(() => {
      setUploading('finished');
    });
  }

  function renderUploader() {
    switch(uploading) {
      case 'idle':
        return <UploaderBox>
          <input type="file" id="file-select" ref={inputRef} onChange={e=>handleInputChange(e)}/>
        </UploaderBox>
      
      case 'uploading':
        return <p>Uploading...</p>

      case 'finished':
        return <UploaderBox>
          <p>{(success ? 'File successfully uploaded!' : 'File failed to upload.')}</p>
          <input type="file" id="file-select" ref={inputRef} onChange={e=>handleInputChange(e)}/>
        </UploaderBox>
    }
  }


  return (
    <div>
      <h2>Upload portfolio</h2>
      {renderUploader()}
    </div>
  )
}