import {useState, useEffect} from "react";
import { palmeirasQuestions } from "../Api";
import styles from "./styles.module.css";
import {GiSoccerBall} from "react-icons/gi";
import {toast } from 'react-toastify';
import Modal from "react-modal";
import StartNewGame from "../Modal/StartNewGame";

export default function Game(){
    const [response, setResponse] = useState<string[]>([]); //useState da resposta
    const [indexQuestion, setIndexQuestion] = useState(0); //random da question
    const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //buttons
    const [abcUsed, setAbcUsed] = useState<string[]>([]); //letras que eu joguei
    const [chances, setChanges] = useState <number>(0); //minhas chances
    const [punctuation, setPontuation] = useState<number>(0);
    const [isOpenNewGame, setIsOpenNewGame] = useState (false);

    function startNewGame(){
        setIsOpenNewGame(false);
        setResponse([]);
        setChanges(0);
        setAbcUsed([]);
        setIndexQuestion(0);
        setPontuation(0);
        //reseta ao padrão
    }

    function quitGame(){
        startNewGame();
        window.location.href = '/'
    }

    useEffect(()=>{
        const lenghTheReponse = palmeirasQuestions[indexQuestion].correct.length; //pegando o tamanho da resposta
        const stringresponse =  palmeirasQuestions[indexQuestion].correct; // pega a resposta
        const listString = [] // lista vazia

        for (var x = 0; x < lenghTheReponse; x ++){
            listString.push(stringresponse[x].toUpperCase());
        }
         // adicionando cada letra da resposta na lista vazia

        setResponse(listString,) // passando o valor da minha lista vazia  para a response

    },[Game, response, indexQuestion]); // use state de obter respostas em formato lista
    
    useEffect(()=>{
        const noRepeatUsed = new Set(abcUsed); //não repetir mesmas strings
        const noRepeatReponse = new Set(response);
        
        if (noRepeatReponse.size === (noRepeatUsed.size - chances) && noRepeatUsed.size > 1){
            toast.success('Avanti palestra!!') 
            setResponse([]);
            setChanges(0);
            setAbcUsed([]);
            setPontuation(punctuation + 100)
            setIsOpenNewGame(true);
            
        }
        //verificando se o numero de chances jogadas, menos o numero de chances perdidas é igual ao tamanho da frase
    },[abcUsed]) // useState de vitória

    function handleLetter(letter:string){
        if (abcUsed.some((item)=>{
            return item === letter
        })){
            toast.warning('Você já jogou esta letra');
            return
        }
        //verificando se a letra que eu joguei já não foi usada
        else{
            setAbcUsed([...abcUsed, letter]);
        }
         //se não foi mando ela pra uma lista de letras jogadas
        
        if (!response.includes(letter)){
            setChanges(chances + 1);
            if (chances >= 4){
                toast.error('Perdemo :(')
                setResponse([]);
                setChanges(0);
                setAbcUsed([]);
                setPontuation(0);
            }
        }
         //verificando se a letra que eu joguei não existe na resposta, se não existe vai perdendo chances;
    }

    function getIndexNoRepeat() {
            if ((palmeirasQuestions.length - 1) === indexQuestion){
                setIsOpenNewGame(true);
            }else{
                setIndexQuestion(indexQuestion + 1)
            }
        }



    return(
        <>  
            <main className={styles.container}>
                <section className={styles.pause}>
                    <div className={styles.infos}>
                        <p className={styles.infosP}><strong>Pontuação:</strong> {punctuation}</p>
                        <p className={styles.infosP}><strong>Chances:</strong> {5-chances}</p>
                    </div>
                    <button className={styles.pauseButton}><GiSoccerBall/></button>
                </section>
                
                <section className={styles.gameArea}>
                    <div className={styles.ReponseArea}>
                        <div className={styles.ReponseAreaSon}>
                            {response.map((item)=>{
                                return(
                                    <span key={item} className={styles.responseBlock}
                                    id={abcUsed.includes(item)?(styles.specialStyle):('')}>
                                        <p style={abcUsed.includes(item)?({color:'#006437', animation:'sucess 2s'}):({color:'transparent'})}>{item}</p>
                                    </span>
                                )
                            })} 
                        </div>
                    </div>

                    <div className={styles.titleArea}>
                        <h1 className={styles.title}>{palmeirasQuestions[indexQuestion].tip}</h1>
                    </div>
                
                    <div className={styles.buttonsFather}>
                        <div className={styles.buttonsSon}>
                            {abc.map((item, index)=>{
                                return(       
                                    <button key={index}
                                    value={item}
                                    onClick={()=>handleLetter(item)}
                                    className={styles.button}
                                    disabled={abcUsed.includes(item)?(true):(false)}>{item}</button>
                                    
                                )
                            })}
                        </div>
                    </div>
                </section>

                <article className={styles.previousPlays}>
                    <span className={styles.previousPlaysSon}>
                        {abcUsed.map((item, index)=>{return(
                            <p key={index} className={styles.previousPlaysP}
                                style={response.includes(item)?({color:'#006437', fontWeight:'bold'}):({})}>{item}
                            </p>
                        )})}
                    </span>
                </article>
            </main>

            <Modal isOpen={isOpenNewGame}
            onRequestClose={quitGame}
            className={'modal'}>
                <StartNewGame NewGame={startNewGame} QuitGame={quitGame}/>

            </Modal>


        </>
    )
}