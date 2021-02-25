import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/CountDown.module.css';

import { FiX, FiPlay } from 'react-icons/fi';
import {FaCheckCircle} from 'react-icons/fa';



export function CountDown(){
    const {minutes, seconds, hasFinished, isActive, startCountDown, resetCountDown} = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return(
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button disabled type='button' className= {`${styles.countdownButton} ${styles.countdownButtonClosed}`}>
                    Ciclo Encerrado
                    <FaCheckCircle size={18}/>
                </button>
            ): (
                <>
                    { isActive ? (
                        <button type='button' className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountDown}>
                            Abandonar ciclo 
                            <FiX size={20}/>
                        </button>
                    ) : (
                        <button type='button' className={styles.countdownButton} onClick={startCountDown}>
                            Iniciar um ciclo 
                            <FiPlay size={16}/>
                        </button>
                    ) }
                </>
            )}

                  

        </div>
    )
}