import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile(){
    const { level } = useContext(ChallengesContext)

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/M-RaquelCS.png" alt="imgProfile"/>
            <div>
                <strong>Maria Raquel</strong>
                <p>
                    <img src="icons/level.svg" alt="iconLevel"/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}