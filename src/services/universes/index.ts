import { Request, Response } from 'express';
import { RouteDefinition } from 'falcor-router';


export const routes = ( context: any, req: Request, res: Response ): RouteDefinition[] => {
    return [
        {
            route: '',
            get:   pathSet => [],
        }
    ];
};
