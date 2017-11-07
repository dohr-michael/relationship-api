import { Handler } from 'express';
import * as FalcorRouter from 'falcor-router';
import * as falcorExpress from 'falcor-express';

import { Context } from '../context'
import * as universes from './universes';


export const handlers = ( config: Context ): Handler => {
    return falcorExpress.dataSourceRoute( ( req, res ) => new FalcorRouter( [
        ...universes.routes( config, req, res ),
    ] ) );
};
