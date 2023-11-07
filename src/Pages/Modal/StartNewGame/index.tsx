import styles from "./styles.module.css";

interface functionProps{
    NewGame: ()=>void;
    QuitGame: ()=>void;
    Punctuation:number;
    MaxPunctuation:number
}
const StartNewGame = ({NewGame, QuitGame, Punctuation, MaxPunctuation}:functionProps) =>{
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h3 className={styles.h3}>Parabéns, você ganhou!</h3>
                <div className={styles.punctuationAndImg}>
                    <img src="../palmeiras.webp" alt="logo palmeiras" className={styles.modalImgPalmeiras}/>
                    <p className={styles.punctuation}>Pontuação: {Punctuation}/{MaxPunctuation}</p>
                </div>
                
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