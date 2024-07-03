import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const items = ['Новый элемент 1', 'Новый элемент 2', 'Новый элемент 3', 'Новый элемент 4'];
// Рендеринг компонента App
ReactDOM.render(<App items={items} />, document.getElementById('root'));
