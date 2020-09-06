import { ApolloServer, gql } from "apollo-server-micro";
import Cors from "micro-cors";
import {Interface} from "readline";

const API_ENDPOINT = 'https://shop-directory-heroku.laybuy.com/api/tiles?page[size]=8&page[number]=1&include=activePromotion&filter[order]=Offers & Deals&filter[category_id]=1';

const typeDefs = gql`
  type Query {
    getTiles(first: Int = 25, skip: Int = 0): [Tile!]!
  },
  
  type Tile {
    id: ID!
    name: String!
    url: String!
    tileImage: String!
  }
`;

type ApiTileAttributes = {
    name: string,
    url: string,
    tileImage: {
        url: string
    }
}

type ApiTile = {
    id: number,
    attributes: ApiTileAttributes
}

type ApiResponse = {
    data: ApiTile[]
}

function getTilesFromApi(): Promise<ApiResponse> {
    return fetch(API_ENDPOINT, {
        credentials: 'include'
    }).then(response => response.json());
}

const resolvers = {
    Query: {
        getTiles: async (_parent, args, _context) => {
            const jsonResponse = await getTilesFromApi();

            return jsonResponse.data.map(({ id, attributes }) => {
                return {
                    id,
                    name: attributes.name,
                    url: attributes.url,
                    tileImage: attributes.tileImage.url,
                }
            });
        }
    }
}

const cors = Cors({
    allowMethods: ["GET", "POST", "OPTIONS"]
});

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

const handler = apolloServer.createHandler({ path: "/api/graphql" });

export const config = {
    api: {
        bodyParser: false
    }
};

export default cors(handler);