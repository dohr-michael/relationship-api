/*declare module 'neo4j-driver' {
    import { Observable } from 'rxjs';
    export type Record = {
        get: ( name: string ) => any;
    };
    export type Result = {
        records: Record[];
    };
    export type Session = {
        close: () => void;
        run: ( ...args: any[] ) => Promise<Result>;
    };
    export type Driver = {
        session: () => Session;
        close: ( ...args: any[] ) => void;
    };

    export interface Auth {}

    export const v1: {
        driver: ( url: string, auth: Auth ) => Driver;
        auth: {
            basic: ( user: string, password: string ) => Auth;
        }
    };
}*/