import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challlenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
/*focopraticagrupo*/
interface ChallengesContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number; 
    currentExperience: number; 
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge , setActiveChallenge] = useState(null);

    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1)*4,2)

    useEffect(()=> {
        Notification.requestPermission();
    }, [])

    useEffect(()=>{
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    },[level, currentExperience, challengesCompleted])

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challlenges.length)
        const challenge = challlenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();
        /*neverstoplearning*/

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio ;)', {
                body: `Valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completedChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        
    }

    return(
        <ChallengesContext.Provider value={{ level, currentExperience, challengesCompleted, levelUp,startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completedChallenge, closeLevelUpModal }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}