import { Request, Response } from 'express';
import { RouteDefinition } from 'falcor-router';
import { Context } from '../../context';


export const routes = ( context: Context, req: Request, res: Response ): RouteDefinition[] => {
    return [
        {
            route: '',
            get: pathSet => [],
        }
    ];
};
