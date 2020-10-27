import { Machine, assign } from 'xstate';

interface inputsContext {
    consumers: number;
    agents: number;
}

// This is the base state-machine for the client app. 
export const inputsMachine = Machine<inputsContext> ({
    id: 'input', 
    initial: 'idle', 
    context: {
        consumers: null,
        agents: null
    },
    states: {
        idle: {},
        result: {
            on: {
                RESTART: 'idle'
            }
        }
    },
    on: {
        SUBMIT: {
            target: '.result',
            actions: assign({
                consumers: (_, event) => event.consumers,
                agents: (_, event) => event.agents
            })
        },
        RESTART: 'idle'
    }
    
});