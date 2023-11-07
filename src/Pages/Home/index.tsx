import styles from "./styles.module.css";
import {AiFillCaretRight} from "react-icons/ai";
import {useEffect, useState} from 'react';

export default function Home(){
    const [hasSave, setHasSave] = useState (false);

    useEffect(()=>{
        let punctuationStorage = localStorage.getItem("punctuation");
        let abcUsedStorage = localStorage.getItem("abcUsed");
        let chancesStorage = localStorage.getItem("chances");
        let indexQuestionStorage = localStorage.getItem("indexQuestion"); 

        try{    
            if (abcUsedStorage && chancesStorage && indexQuestionStorage && punctuationStorage){
                setHasSave(true);
            }
        }catch(err){
            alert('oi')
        }
    },[]);

    const handleGame=(url:string)=>{
        window.location.href = `/game/${url}`
    }


    return(
        <>
            <div className={styles.container}>
                <h1>Roda-Roda Palmeiras</h1>
                <label className={styles.itens}>
                    <div className={styles.imgArea}>
                        <img src="./palmeiras.webp" alt="logo palmeiras"
                        className={styles.img}/>
                    </div>

                    {hasSave?(
                        <button className={`buttonDefault ${styles['buttonPlay']}`}
                        onClick={()=>handleGame('load')}>
                            Continuar
                        </button>
                    ):(null)}


                    <button className={`buttonDefault ${styles['buttonPlay']}`}
                    onClick={()=>handleGame('new')}>
                        <span className="buttonMoreIcons">
                            Novo jogo
                            <AiFillCaretRight/>
                        </span>
                    </button>


                </label>

            </div>
        </>
    )
}