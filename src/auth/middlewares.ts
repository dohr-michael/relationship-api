import { RequestHandler } from 'express';
import * as user from './user';

export const withUser = (): RequestHandler => ( req, res, next ) => {
    const auth = req.get( 'Authorization' );
    user.setUser( req, undefined );
    if( !auth ) {
        // TODO Log
        return next();
    }
    const matches = auth.match( /^(\S+)\s+(\S+)$/ );
    if( !matches ) {
        // TODO Log
        return next();
    }
    
    const [ _, schema, token ] = matches;
    
    // TODO Auth...
    user.setUser( req, { _id: '', email: token, name: token } );
    return next();
};

export const isLoggedIn = (): RequestHandler => ( req, res, next ) => {
    const u = user.getUser( req );
    if( !!u ) next();
    res.status( 401 ).json( { status: 401, message: 'Not authenticated' } );
};
