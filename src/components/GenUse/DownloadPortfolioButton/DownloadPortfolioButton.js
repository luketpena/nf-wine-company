import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';

export default function DownloadPortfolioButton(props) {

  const clickDownload = async ()=> {
    Axios({
      url: '/api/aws/download',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'newfrancewine_portfolio.pdf');
      document.body.appendChild(link);
      link.click();
      console.log(response.data);
    });
  }
  
  return (
    <button onClick={clickDownload} class="button-primary">{props.text}</button>
  )
}