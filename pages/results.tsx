import { useMemo } from 'react';
import { useMachine } from '@xstate/react';
import { createResultsMachine } from '../states/resultsMachine'
import styles from '../styles/Home.module.css'

export default function Result(props) {

  const resultsMachine = useMemo(() => {
    return createResultsMachine(props.consumers, props.agents)
  }, [props.consumers, props.agents])

  const [current, send] = useMachine(resultsMachine);
  
  /**
   * This components implements the three states of the resultsMachine - 
   * .. loading (initial state), loaded, and failure.
   * It is in loading state when waiting for the waiting for the simulation results from the server.
   * It is also entered into when the REFRESH or RETRY event is raised. 
   * The loaded state is entered after successfully receiving he simulation result, otherwise the 
   * .. state changes to the failure state.  
   */
  const { consumers, agents, results } = current.context as any;

  if(consumers != props.consumers || agents != props.agents) {
    send('RELOAD', {consumers: props.consumers, agents: props.agents});
  }

  return (
    <section data-machine={resultsMachine.id} data-state={current.toStrings().join(' ')}>
      {current.matches('loading') && <div>loading simulation results...</div>}
      {current.matches('loaded') && results && (
        <div id='sim-result'>
          <h3>Simulation Results: </h3>
          <p>{`Consumer Connected : ${results.consumerConnectedPercent}%`}</p>
          <p>{`Agent Utilization : ${results.agentUtilizationPercent}%`}</p>
          <button className={styles.submit} onClick={_ => send('REFRESH') } >Refresh</button> 
        </div>
      )}
      {current.matches('failure') && 
        <div>
          Simulation failed. Please retry. 
          <button className={styles.submit} onClick={_ => send('RETRY') } >Retry</button> 
        </div>
      }
      {!current.matches('loading') && 
        <div>
          To try with new consumers and agents values click here: 
          <br></br>
          <button className={styles.submit} onClick={props.onNewRun} >New Run</button> 
        </div>
      }
    </section>
  );

}