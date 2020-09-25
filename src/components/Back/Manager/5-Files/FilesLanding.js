import React from 'react';
import ManagerTitle from '../ManagerTitle';
import FileUploader from './FileUploader';

export default function FilesLanding() {

  return (
    <div>
      <ManagerTitle title="Files" target="/manager"/>
      <div class="section-box">
        <FileUploader />
      </div>
    </div>
  )
}