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
    db.run<{ Total: v1.Integer, Universes: v1.Node[] }>( `
    MATCH (e :Universe)-[r :CreatedBy]->(u: User)
    WITH e, r, u
    ORDER BY r.at DESC
    RETURN count(e) As Total, collect(e) as Universes
   ` ).subscribe( r => {
        console.log( 'success' );
        res.json( r.reduce( ( acc: Universe[], c ) => c.Universes.reduce( ( acc2, c2 ) => [ ...acc2, Universe.fromNode( c2 ) ], acc ), [] ) );
    } );
} );

export { router };
