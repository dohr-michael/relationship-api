import { v1 } from 'neo4j-driver';

export interface Universe {
    _id: number;
    hash: string;
    name: string;
}

export namespace Universe {
    export function fromNode( node: v1.Node ): Universe {
        return {
            _id: node.identity.toNumber(),
            hash: node.properties[ 'hash' ] || '',
            name: node.properties[ 'name' ] || '',
        }
    }

}