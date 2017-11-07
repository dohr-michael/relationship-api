import { v1 as neo4j } from 'neo4j-driver';
import { Observable } from 'rxjs';
import * as config from './config';
import { Neo4jError } from 'neo4j-driver/types/v1';

export type Db = typeof db;

export namespace db {
    let _db: neo4j.Driver | undefined;
    const db = (): neo4j.Driver => {
        if( !_db ) _db = neo4j.driver( config.neoUri(), neo4j.auth.basic( config.neoUser(), config.neoPassword() ) );
        return _db;
    };

    export function run<T = any>( query: string, parameters?: { [key: string]: any } ): Observable<T[]> {
        const s = db().session();
        const r = Observable.fromPromise( s.run( query, parameters ) )
            .map( res => res.records.map( rec => rec.keys.reduce( ( acc, c ) => ({
                ...acc,
                [c]: rec.get( c )
            }), {} ) as T ) );

        r.subscribe( _ => {}, (err: Neo4jError) => {
            console.error( 'Neo4j on error', err.code, err.message );
            s.close()
        }, () => {
            s.close()
        } );
        return r;
    }


    export function disconnect( ...args: any[] ) {
        if( _db ) _db.close( ...args );
    }
}
