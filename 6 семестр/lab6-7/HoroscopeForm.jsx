import React, { useState } from 'react';

const HoroscopeForm = () => {
    const [name, setName] = useState('');
    const [zodiacSign, setZodiacSign] = useState('');
    const [horoscope, setHoroscope] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const horoscopes = {
            Овен: 'Сегодня отличный день для новых начинаний!',
            Телец: 'Терпение принесет вам награды сегодня.',
            Близнецы: 'Будьте открыты для новых идей.',
            Рак: 'Займитесь своим здоровьем и благополучием.',
        };
        setHoroscope(horoscopes[zodiacSign] || 'Пожалуйста, выберите действительный знак зодиака.');
    };

    return (
        <section id="horoscope">
            <h2>Получите Ваш Гороскоп</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Имя:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Знак Зодиака:
                    <input type="text" value={zodiacSign} onChange={(e) => setZodiacSign(e.target.value)} />
                </label>
                <button type="submit">Получить Гороскоп</button>
            </form>
            {horoscope && <p>Ваш Гороскоп: {horoscope}</p>}
        </section>
    );
};

export default HoroscopeForm;
