import * as express from 'express';
import * as bodyParser from 'body-parser';
import { v1 } from 'neo4j-driver';
import { handlers } from '../services';
import { getContext } from '../context';

import { Universe } from '../models/universe';

const router = express.Router();

router.use( '/model.json', bodyParser.urlencoded( { extended: true } ), handlers( getContext() ) );

router.use( '/test', ( req, res ) => {
    const db = getContext().db;
    db.run<{ u: v1.Node }>( `
                    MATCH (u :Universe)-[r :CreatedBy]->(us :User)
                    WITH u, r, us                   
                    ORDER BY r.at DESC
                    RETURN u
   `, { ids: [ 1 ] } ).map( s => s.map( _ => Universe.fromNode( _.u ) ) ).subscribe( r => {
        res.json( r );
    } );
} );

export { router };
