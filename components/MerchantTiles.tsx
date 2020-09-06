import styles from './MerchantTiles.module.css'
import Loading from "./Loading";
import {ApolloError} from "@apollo/client";

type Tile = {
    id: number,
    name: string,
    url: string,
    tileImage: string
}

type MerchantTileProps = {
    tiles: Tile[],
    loading: boolean,
    error: ApolloError
}

const MerchantTiles = ({ tiles, loading, error }: MerchantTileProps) => {
    if (loading) {
        return <Loading />;
    }

    if (error) {
        console.log(error);
        return <p>ERROR!</p>;
    }

    return (
        <div className={styles.grid}>
            {tiles.map(tile => (
                <a href={tile.url} className={styles.card} target="_blank">
                    <div className={styles.image} style={{backgroundImage: `url(${tile.tileImage})`}}></div>
                    <h3>{tile.name}</h3>
                </a>
            ))}
        </div>
    )
}

export default MerchantTiles