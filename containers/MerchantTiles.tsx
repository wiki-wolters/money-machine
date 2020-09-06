import MerchantTiles from "../components/MerchantTiles";
import React, {useState} from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_TILES = gql`
  query {
      getTiles {
        id
        name
        url
        tileImage
      }
  }
`;

const withTiles = <P extends object>(Component: React.ComponentType<P>) => {
    return () => {
        const {
            data,
            loading,
            error
        } = useQuery(GET_TILES);

        return (
            <MerchantTiles
                tiles={data ? data.getTiles : []}
                loading={loading}
                error={error}
            />
        );
    }
}

export default withTiles(MerchantTiles);