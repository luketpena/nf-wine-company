import React from 'react';
import styled from 'styled-components';
import {faHandshake, faWineBottle, faWineGlassAlt} from '@fortawesome/free-solid-svg-icons';

import logo from '../../../images/logo.jpg';

import ProcessCard from './ProcessCard';
import TeamCard from './TeamCard';

const TeamList = require('./TeamList');

const Container = styled.div`
  margin-top: 256px;

  h2 {
    font-size: 2em;
  }
`;

const SecInfo = styled.section`
  .info-img {
    margin: 0 auto;
    display: block;
    max-width: 300px;
  }

  .info-text {
    padding: 16px;
  }
`;

const SecProcess = styled.section`
  .process-item-box {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media only screen and (max-width: 700px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
  }
`;

const SecTeam = styled.section`
  .team-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  } 
`;

const ProcessList = [
  {
    name: 'Collaborate',
    icon: faHandshake,
    text: 'Working with family winemakers from around the world.'
  },
  {
    name: 'Supply',
    icon: faWineBottle,
    text: 'Sharing our thoughtfully curated portfolio throughout Minnesota.'
  },
  {
    name: 'Build Community',
    icon: faWineGlassAlt,
    text: 'Creating avenues that connect great people with wine.'
  }
]

export default function About() {


  function renderProcessItems() {
    return ProcessList.map( (item,i)=>{
      return <ProcessCard key={i} process={item} />
    })
  }

  function renderTeamItems() {
    return TeamList.map( (item,i)=>{
      return <TeamCard key={i} person={item} />
    })
  }

  return (
    <Container>
      <SecInfo className="sec-default">
        <div className="sec-default-content">
          <img 
            src={logo}
            alt="New France Wine Company Offices"
            className="info-img"
          />

          <div className="info-text">
            <h2>A Little More About New France Wine</h2>
            <p>
              Minnesotans are a hardy, well-educated, well-traveled lot. New France Wine Company was founded in 1993 to connect that population with the great wineries of the world. We are a small business with a long-tenured and open-minded staff that views our wine as one of the pleasures of the table.
            </p>
            <p>
              Our company's name pays homage to Minnesota history -- the state was "New France" when part of Napoleon's Louisiana Territory -- but today the world is our neighborhood, with a portfolio that represents 23 countries.  
            </p>
          </div>
        </div>
      </SecInfo>

      <SecProcess className="sec-default">
        <div className="sec-default-content">
        <h2>What do we do?</h2>
        <div className="process-item-box">
          {renderProcessItems()}
        </div>
        </div>
      </SecProcess>

      <SecTeam className="sec-default">
        <div className="sec-default-content">
          <h2>Meet the Team</h2>
          <div className="team-box">
            {renderTeamItems()}
          </div>
        </div>
      </SecTeam>
    </Container>
  )
}