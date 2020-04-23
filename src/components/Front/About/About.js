import React from 'react';
import styled from 'styled-components';
import {faHandshake, faWineBottle, faWineGlassAlt} from '@fortawesome/free-solid-svg-icons';

import ProcessCard from './ProcessCard';
import TeamCard from './TeamCard';

const Container = styled.div`
  margin-top: 256px;
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
    text: '[working with the best producers and suppliers]'
  },
  {
    name: 'Supply',
    icon: faWineBottle,
    text: '[supplying wine to fit the needs of your business]'
  },
  {
    name: 'Build Community',
    icon: faWineGlassAlt,
    text: '[host local events and tastings]'
  }
]

const TeamList = [
  {
    name: 'Eric Freeburg',
    role: '[company role]',
    img: '',
  },
  {
    name: `Raistland O'Dell`,
    role: '[company role]',
    img: '',
  },
  {
    name: 'Marvi Medower',
    role: '[company role]',
    img: '',
  },
  {
    name: 'Erin Ungerman',
    role: '[company role]',
    img: '',
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
            src="https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img-3.jpg"
            alt="New France Wine Company Offices"
            className="info-img"
          />

          <div className="info-text">
            <h2>A Little More About New France Wine</h2>
            <p>
              [Here you can put a big long paragraph about details of the company - where you started from, what you do, what you value. What makes you unique.]
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