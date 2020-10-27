import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Result from './results';
import { useMachine } from '@xstate/react';
import { inputsMachine } from '../states/InputsMachine'

export default function Home() { 
  const [consumersInput, setConsumersInput] = useState(100);
  const [agentsInput, setAgentsInput] = useState(10);
  const [selectedConsumers, setSelectedConsumers] = useState(0);
  const [selectedAgents, setSelectedAgents] = useState(0);
  const [isStartSimulation, setIsStartSimulation] = useState(false);

  const [current, send] = useMachine(inputsMachine);

  /**
   * This components implements the two states of the inputMachine - 
   * .. idle and result.
   * It is in idle state when waiting for the user to select the number of consumers and the 
   * .. agents. It is the initial state and also entered into when the RESTART event is raised. 
   * The result state is entered into when the SUBMIT event is raised. The Result component is 
   * enabled only in result state. 
   */
  
  const handleConsumersChanged= (e) => {
    setConsumersInput(e.target.value);
    send('RESTART', {});
  }
  const handleAgentsChanged= (e) => {
    setAgentsInput(e.target.value);
    send('RESTART', {});
  }
  const handleSubmitClicked = (e) => {
    setIsStartSimulation(true);
    setSelectedConsumers(consumersInput);
    setSelectedAgents(agentsInput);
    e.preventDefault();
    
    send('SUBMIT', {consumers: consumersInput, agents: agentsInput});
  }
  const handleSimulationDone = (e) => {
    setIsStartSimulation(false);
    setSelectedConsumers(0);
    setSelectedAgents(0);
    send('RESTART', {});
  }

  return (
    <div >
      <Head>
        <title>Connection-Simulation</title>
      </Head>
      <main className={styles.main}>
        <div>
          <span className={styles.input}><label >Consumers: </label></span> 
          <input className={styles.input} type="number" max="100" min="10" id="consumers-input" onChange={handleConsumersChanged} onClick={handleSimulationDone}
            value= {consumersInput}
            placeholder="enter number of consumers"/>
          <br></br>
          <label className={styles.input}>Agents: </label>        
          <input className={styles.input} type="number" max="10" min="2" id="agents-input" onChange={handleAgentsChanged} onClick={handleSimulationDone}
            value={agentsInput}
            placeholder="enter number of agents"/>
          <br></br>

          <button className={styles.submit} type="submit" disabled={isStartSimulation} onClick={handleSubmitClicked}>Submit</button>
          {current.matches('result') && <Result consumers= {selectedConsumers} agents={selectedAgents} onNewRun={handleSimulationDone}/>}

        </div>
      </main>

    </div>
  )
}

