import {useState, useEffect} from "react";
import { palmeirasQuestions } from "../Api";
import styles from "./styles.module.css";
import {GiSoccerBall} from "react-icons/gi";
import {toast } from 'react-toastify';
import Modal from "react-modal";
import StartNewGame from "../Modal/StartNewGame";
import Pause from "../Modal/PauseGame";
import { useParams } from "react-router-dom";

export default function Game(){
    const maxPunctuation = (palmeirasQuestions.length * 100);
    const [response, setResponse] = useState<string[]>([]); //useState da resposta
    const [indexQuestion, setIndexQuestion] = useState(0); //index da questão
    const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //buttons
    const [abcUsed, setAbcUsed] = useState<string[]>([]); //letras que eu joguei
    const [chances, setChanges] = useState <number>(0); //minhas chances
    const [punctuation, setPontuation] = useState<number>(0); //pontuação
    const [isOpenNewGame, setIsOpenNewGame] = useState (false); //abrir modal de novo jogo ou menu pós vitória
    const [isOpenPause, setIsOpenPause] = useState (false); //abrir modal de pause;

    const url = useParams().states

    useEffect(()=>{
        if (url === 'load'){
            getLocalStorage();
        }else{
            return;
        }
    },[Game]);

    function startNewGame(){
        setIsOpenNewGame(false);
        setIsOpenPause(false);
        setResponse([]);
        setChanges(0);
        setAbcUsed([]);
        setIndexQuestion(0);
        setPontuation(0);
    }  // função zera os processo do jogo

    function quitGame(){
        startNewGame();
        window.location.href = '/'
    } // função vai para o tela de inicio

    useEffect(()=>{
        const lenghTheReponse = palmeirasQuestions[indexQuestion].correct.length; 
        const stringresponse =  palmeirasQuestions[indexQuestion].correct; 
        const listString = []

        for (var x = 0; x < lenghTheReponse; x ++){
            listString.push(stringresponse[x].toUpperCase());
        }

        setResponse(listString,)

    },[Game, response, indexQuestion]); //obter a resposta em lista  
    
    
    function handleLetter(letter:string){
        if (abcUsed.some((item)=>{
            return item === letter
        })){
            toast.warning('Você já jogou esta letra');
            return
        }
        else{
            setAbcUsed([...abcUsed, letter]);
        }
        if (!response.includes(letter)){
            setChanges(chances + 1);
            setPontuation(punctuation - 10)
            if (chances >= 4){
                toast.error('Perdemo :(')
                startNewGame();
            }
        }
    } // adicona as letras jogadas e verifica minhas chances
    
    useEffect(()=>{
        const noRepeatUsed = new Set(abcUsed); 
        const noRepeatReponse = new Set(response);
        
        if (noRepeatReponse.size === (noRepeatUsed.size - chances) && noRepeatUsed.size > 1){
            toast.success('Avanti palestra!!') 
            setResponse([]); setChanges(0); setAbcUsed([]); setPontuation(punctuation + 100);            
            newIndexOrWin();
        }
        else{
            return;
        }
    },[abcUsed]); // Verifica se eu ganhei a rodada
    

    function newIndexOrWin() {
            if ((palmeirasQuestions.length - 1) === indexQuestion){
                setIsOpenNewGame(true);
            }else{
                setIndexQuestion(indexQuestion + 1)
            }
        } // Verifica se eu ganhei a rodada e posso ir pra proximo, ou ganhei o jogo // 

    function controlPause(){
        setIsOpenPause(!isOpenPause);
    }

    function saveLocalStorage(){
        try{
            localStorage.setItem('punctuation', JSON.stringify(punctuation));
            localStorage.setItem('abcUsed', JSON.stringify(abcUsed));
            localStorage.setItem('chances', JSON.stringify(chances));
            localStorage.setItem('indexQuestion', JSON.stringify(indexQuestion));
            toast.success('Jogo salvo!');
            controlPause(); 
        }catch(err){
            console.log('Erro ao salvar estado');
        }
    }

    function getLocalStorage(){
        let punctuationStorage = localStorage.getItem("punctuation");
        let abcUsedStorage = localStorage.getItem("abcUsed");
        let chancesStorage = localStorage.getItem("chances");
        let indexQuestionStorage = localStorage.getItem("indexQuestion"); 

        try{    
            if (abcUsedStorage && chancesStorage && indexQuestionStorage && punctuationStorage){
                setPontuation(JSON.parse(punctuationStorage));
                setAbcUsed(JSON.parse(abcUsedStorage));
                setChanges(JSON.parse(chancesStorage));
                setIndexQuestion(JSON.parse(indexQuestionStorage));
                setIsOpenPause(false);
            }
        }catch(err){
            console.log('erro ao obter dados')
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
                    <button className={styles.pauseButton} onClick={controlPause}><GiSoccerBall/></button>
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
            className={'modal'}
            style={{overlay:{
                backgroundColor:"rgba(255,255,255, 0.3)"
            }}}>
                <StartNewGame NewGame={startNewGame} 
                QuitGame={quitGame}
                Punctuation={punctuation}
                MaxPunctuation={maxPunctuation}/>
            </Modal>
            { /* modal pós vitoria*/ }

            <Modal isOpen={isOpenPause}
            onRequestClose={controlPause}
            className={'modal'}
            style={{overlay:{
                backgroundColor:"rgba(255,255,255, 0.3)"
            }}}>
                <Pause Punctuation={punctuation}
                CloseModal={controlPause}
                NewGame={startNewGame}
                QuitGame={quitGame}
                SaveStates={saveLocalStorage}
                LoadStates={getLocalStorage}/>
            </Modal>
            { /* modal pause*/ }
            

        </>
    )
}