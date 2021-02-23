import styles from '../styles/components/Profile.module.css'

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/M-RaquelCS.png" alt="imgProfile"/>
            <div>
                <strong>Maria Raquel</strong>
                <p>
                    <img src="icons/level.svg" alt="iconLevel"/>
                    Level 1
                </p>
            </div>
        </div>
    );
}