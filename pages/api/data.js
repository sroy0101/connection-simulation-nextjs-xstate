
import { startSimulation } from '../../server/app';

export default function (req, res) {
    //return new Promise ((resolve, reject) => {
        const badRequest = `Error: missing url parameter(s). Usage example: ${req.protocol}://${req.host}/getSimulationResult?consumers=100&agents=20`;
        try {
            if(req.query) {
                if(!parseInt(req.query.agents) || !parseInt(req.query.consumers))  {
                    throw new Error(badRequest);
                }

                startSimulation(req.query.consumers, req.query.agents)
                .then (response => {
                    res.statusCode = 200;
                    res.send(response);
                    // res.setHeader('Content-Type', 'application/json');
                    // res.setHeader('Cache-Control', 'max-age=180000');
                    // res.end(JSON.stringify(response))
                    // resolve();
                }).catch(error =>  {
                    res.status(405).end();
                    res.send(error);
                    // res.json(error);
                    // res.status(405).end();
                    // resolve();
                });
                
            } else {
                throw new Error(badRequest);
            }
        } catch (error) {
            res.send({ "Error": error });
            // res.json(error);
            // res.status(405).end();
            // resolve();
        }
    //})
}
  