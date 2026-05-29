import axios from 'axios';
export  function buildClient({ req }) {
    console.log('Building client with req:', req ? 'Server-side' : 'Client-side');
     if(typeof window === 'undefined') {
        // we are on the server, make request to ingress-nginx-controller service
        //route= http://name-of-service.namespace.svc.cluster.local/path-to-api
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    }else{
        //we are on the browser, make request to our own domain
        return  axios.create({
                baseURL: '/' 
        });
    }
}