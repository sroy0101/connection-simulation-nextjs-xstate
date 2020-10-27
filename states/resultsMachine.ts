import { Machine, assign } from 'xstate';

interface resultsContext {
    consumers: number;
    agents: number;
    results: any;
}

export const createResultsMachine = (consumers, agents) => {
    return Machine<resultsContext> ({
        id: 'result',
        initial: 'loading',
        context: {
            consumers,
            agents, 
            results: null
        },
        states: {
            loading: {
                invoke: {
                    id: 'fetch-simulation-result',
                    src: invokeFetchSimulationResult,
                    onDone: {
                        target: 'loaded',
                        actions: assign({
                            results:(_, event) => event.data
                        })
                    },
                    onError: 'failure'

                }
            },
            loaded: {
                on: {
                    REFRESH: 'loading'  
                }
            },
            failure: {
                on: {
                    RETRY: 'loading'    
                }
            }
        },
        on: {
            RELOAD: {
                target: '.loading',
                actions: assign({
                    consumers: (_, event) => event.consumers,
                    agents: (_, event) => event.agents,
                    results: null
                })
            }
        }        
    })
}

function invokeFetchSimulationResult(context) {
    const {consumers, agents} = context;
    const url= `http://localhost:3000/api/data?consumers=${consumers}&agents=${agents}`;
    return (
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify({consumers: consumers, agents: agents})
        })
        .then((response:any) => response.json())       
    )    
}