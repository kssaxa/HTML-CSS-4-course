import React, { useState } from 'react';

const compatibilityData = {
    Овен: {
        Телец: 'Средняя совместимость',
        Близнецы: 'Высокая совместимость',
        Рак: 'Низкая совместимость',
        // Добавьте совместимость для других знаков...
    },
    Телец: {
        Овен: 'Средняя совместимость',
        Близнецы: 'Средняя совместимость',
        Рак: 'Высокая совместимость',
        // Добавьте совместимость для других знаков...
    },
    // Добавьте данные совместимости для остальных знаков...
};

const CompatibilityChecker = () => {
    const [sign1, setSign1] = useState('');
    const [sign2, setSign2] = useState('');
    const [compatibility, setCompatibility] = useState('');

    const handleCheckCompatibility = () => {
        if (compatibilityData[sign1] && compatibilityData[sign1][sign2]) {
            setCompatibility(compatibilityData[sign1][sign2]);
        } else {
            setCompatibility('Нет данных о совместимости для выбранных знаков.');
        }
    };

    return (
        <section id="compatibility">
            <h2>Проверка Совместимости Знаков Зодиака</h2>
            <div>
                <label>
                    Первый знак зодиака:
                    <input type="text" value={sign1} onChange={(e) => setSign1(e.target.value)} />
                </label>
                <label>
                    Второй знак зодиака:
                    <input type="text" value={sign2} onChange={(e) => setSign2(e.target.value)} />
                </label>
                <button onClick={handleCheckCompatibility}>Проверить Совместимость</button>
            </div>
            {compatibility && <p>Совместимость: {compatibility}</p>}
        </section>
    );
};

export default CompatibilityChecker;
