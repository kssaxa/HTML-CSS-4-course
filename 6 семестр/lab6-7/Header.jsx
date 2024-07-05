import styles from './Header.module.css';

const Header = () => {
    return(
        <div className={styles.wrapper}>
            <div className={styles.menuButton}>Главная</div>
            <div className={styles.menuButton}>Знаки зодиака</div>
            <div className={styles.menuButton}>Гороскоп</div>
        </div>
    );
};

export default Header;