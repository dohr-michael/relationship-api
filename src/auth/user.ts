export type ConnectedUser = {
    _id: string;
    email: string;
    name: string;
}


export type User = ConnectedUser | undefined;

export const getUser = ( req: any ): User => req[ 'user' ] as User;

export const setUser = ( req: any, user: User ) => req[ 'user' ] = user;
