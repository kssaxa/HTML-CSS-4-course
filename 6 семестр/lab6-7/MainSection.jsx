import React from 'react';
import styles from './App.module.css';
import ariesImg from './assets/aries.png';
import virgoImg from './assets/virgo.png';
import geminiImg from './assets/gemini.png';
import leoImg from './assets/leo.png';
import libraImg from './assets/libra.png';
import scorpioImg from './assets/scorpio.png';

const MainSection = () => {
    return (
        <section id="main" className={styles.wrapper}>
            <h2>Добро пожаловать в Астрологические Инсайты</h2>
            <p>Исследуйте тайны звезд и узнайте, что говорит о вас ваш знак зодиака.</p>
            <div>
                <img src={ariesImg} alt="Овен"/>
                <img src={virgoImg} alt="Дева"/>
                <img src={geminiImg} alt="Близнецы"/>
                <img src={leoImg} alt="Лев"/>
                <img src={libraImg} alt="Весы"/>
                <img src={scorpioImg} alt="Скорпион"/>
            </div>
        </section>
    );
};

export default MainSection;
