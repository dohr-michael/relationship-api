import { Db, db } from './db';


export type Context = { db: Db };
export const getContext = (): Context => ({ db });
