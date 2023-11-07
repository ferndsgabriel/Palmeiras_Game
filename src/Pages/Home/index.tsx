import styles from "./styles.module.css";
import {AiFillCaretRight} from "react-icons/ai";

export default function Home(){

    const handleGame=()=>{
        window.location.href = '/game'
    }
    return(
        <>
            <div className={styles.container}>
                <h1>Roda-Roda Palmeiras</h1>
                <label className={styles.itens}>
                    <div className={styles.imgArea}>
                        <img src="./Palmeiras.webp" alt="logo palmeiras"
                        className={styles.img}/>
                    </div>
                    <button className={`buttonDefault ${styles['buttonPlay']}`}
                    onClick={handleGame}>
                        <span className="buttonMoreIcons">
                            Jogar
                            <AiFillCaretRight/>
                        </span>
                    </button>
                </label>

            </div>
        </>
    )
}