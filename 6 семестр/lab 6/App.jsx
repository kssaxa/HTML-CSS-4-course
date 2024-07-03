import React, { useState } from 'react';

const App = ({ items }) => {

    const [list, setList] = useState(
        items.map((item, index) => ({ text: item, clicks: 0, id: index }))
    );

    const handleClick = (id) => {
        setList((prevList) =>
            prevList
                .map((item) =>
                    item.id === id ? { ...item, clicks: item.clicks + 1 } : item
                )
                .sort((a, b) => b.clicks - a.clicks)
        );
    };

    return (
        <div>
            <h3>Список элементов</h3>
            <ol>
                {list.map((item) => (
                    <li key={item.id} onClick={() => handleClick(item.id)}>
                        {item.text} {item.clicks > 0 && `(${item.clicks})`}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default App;

