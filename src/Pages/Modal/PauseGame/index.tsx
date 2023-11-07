import styles from "./styles.module.css";

interface functionProps{
    CloseModal:()=>void;
    NewGame: ()=>void;
    Punctuation:number;
    QuitGame: ()=>void;
    SaveStates:()=>void;
    LoadStates:()=>void;
}
const Pause = ({Punctuation, CloseModal, NewGame, QuitGame,SaveStates, LoadStates}:functionProps) =>{
    return(
        <div className={styles.container}>
                <h3 className={styles.h3}>Pontuação: {Punctuation}</h3>
                <div className={styles.ButtonsAndImg}>
                    <img src="../palmeiras.webp" alt="logo palmeiras" className={styles.modalImgPalmeiras}/>
                    <div className={styles.buttons}>
                        <button
                        className={styles.button}
                        onClick={CloseModal}><span className={styles.zIndexText}>Continuar</span></button>

                        <button
                        className={styles.button}
                        onClick={QuitGame}><span className={styles.zIndexText}>Tela inicial</span></button>

                        <button
                        className={styles.button}
                        onClick={NewGame}><span className={styles.zIndexText}>Nova partida</span></button>
                                                <button
                        className={styles.button}
                        onClick={SaveStates}><span className={styles.zIndexText}>Salvar estado</span></button>

                        <button
                        className={styles.button}
                        onClick={LoadStates}><span className={styles.zIndexText}>Carregar estado</span></button>
                        
                    </div>
                </div>
        </div>
    )
}

export default Pause;