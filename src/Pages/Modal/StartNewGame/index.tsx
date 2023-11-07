import styles from "./styles.module.css";

interface functionProps{
    NewGame: ()=>void;
    QuitGame: ()=>void;
}
const StartNewGame = ({NewGame, QuitGame}:functionProps) =>{
    return(
        <div className={styles.container}>
            <div>
                <h3>Parabéns, você ganhou!</h3>
                <img src="../palmeiras.webp" alt="logo palmeiras"/>
            </div>
            <div className={styles.buttons}>
                <button
                onClick={NewGame}
                className={styles.button}><span className={styles.zIndexText}>Nova partida</span></button>
                <button
                onClick={QuitGame}
                className={styles.button}><span className={styles.zIndexText}>Menu</span></button>
            </div>
        </div>
    )
}

export default StartNewGame;