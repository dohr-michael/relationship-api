import * as express from 'express';
import * as cors from 'cors';
import { withUser, user } from './auth';
import { router } from './api';


const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8080;

const app = express();
app.use( cors( {
    origin: /.*/,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
} ), withUser() );


// Standard routes.
app.get( '/', ( req, res ) => {
    res.json( {
        code: 'OK',
    } );
} );
app.use( '/api', router );
app.get( '/*', ( req, res ) => {
    res.status( 404 ).json( {
        code: 404,
        error: 'Not Found',
        message: 'No matching API route',
    } );
} );

app.listen( `${port}`, ( err: any ) => {
    if( err ) {
        console.error( err );
        return;
    }
    console.info( '==> ✅ Server is listening' );
    console.info( `==> Go to http://${hostname}:${port}` );
} );
