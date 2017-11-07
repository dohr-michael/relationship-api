import { Request, Response } from 'express';
import { RouteDefinition } from 'falcor-router';
import { v1 as neo4j } from 'neo4j-driver';
import { Context } from '../../context';
import { Universe } from '../../models/universe';


export const routes = ( context: Context, req: Request, res: Response ): RouteDefinition[] => {
    return [
        {
            route: 'universes["_id", "name"]',
            get: pathSet => {
                return [];
            }
        },
        {
            route: 'universesById[{keys:ids}]["_id", "name"]',
            get: pathSet => {
                let ids = pathSet[ 'ids' ] || [];
                if( !Array.isArray( ids ) ) ids = [ ids ];
                if( ids.length === 0 ) {
                    return [];
                }
                context.db.run<neo4j.Node>( `
                    MATCH (e :Universe)-[r :CreatedBy]->(u: User)
                    WHERE ID(e) in {ids}
                    WITH e, r, u                   
                    ORDER BY r.at DESC
                    RETURN e
                `, { ids } ).map( c => c.map( _ => Universe.fromNode( _ ) ) ).toPromise();
                return [];
            }
        }
    ];
};
