
# Connection-Simulation-NextJS-Xstate

This is NextJS version of the connection-simulation nodejs app, with xState used as the application state controller.  

(Note: The backend code doesn't create the .csv report files as in the original connection-simulation node app.)

![csn.results.png](https://raw.githubusercontent.com/sroy0101/connection-simulation-nextjs/main/images/csn.results.PNG)

## Getting Started
1. Clone the project to local server
2. Install the packages 
    > yarn
3. Run the application 
    > yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Debugging on VSC
To debug both frontend and backend in visual Studio Code, run the Next:Full configuration from the configuration drop-down in the debug window of the VCS. 

The VSC launch.json file with debugging configurations for frontend (using the chrome-debugger) and the backend is provided. 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## ToDos
1. Add the unit amd e2e tests using jest. 
2. Show simulation progress bar and allow much longer simulation time. Currently the max time allowed is 1 minute by the backend. 
