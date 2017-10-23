import { ref, atom, error } from 'falcor-json-graph';
import * as shortid from 'shortid';

export const $ref = ref;
export const $atom = atom;
export const $err = error;
export const generateId = () => shortid();
export const keys = ( obj: any ) => Object.getOwnPropertyNames( obj );


export function toPathValues( pathGen: ( item: any, field: string ) => any[], f?: (string[] | string | (( i: any ) => string[])) ) {
    return ( item: any ) => {
        let fields: string[] = [];
        if( !f ) fields = keys( item );
        else if( typeof f === 'function' ) fields = f( item );
        else if( typeof f === 'string' ) fields = [ f ];
        else fields = f;

        const getVal = ( field: string ) => {
            if( item.$error ) {
                return item.$error;
            } else {
                const value = item[ field ];
                // It might be an atom.
                if( typeof value === 'object' ) {
                    // If the value is, e.g., a $ref, we just return it.
                    if( value.$type ) {
                        return value;
                    }
                    return $atom( value );
                }
                return value;
            }
        };
        return fields.map( field => ({
            path: pathGen( item, field ),
            value: getVal( field )
        }) );
    };
}