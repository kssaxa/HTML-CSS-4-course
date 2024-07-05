import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from "./Header.jsx";
import HoroscopeForm from './HoroscopeForm';
import MainSection from './MainSection';
import CompatibilityChecker from './CompatibilityChecker';
const items = [
    'Овен (21 марта - 19 апреля)',
    'Телец (20 апреля - 20 мая)',
    'Близнецы (21 мая - 20 июня)',
    'Рак (21 июня - 22 июля)'
];



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header />
        <MainSection />
        <App items={items} />
        <HoroscopeForm />
        <CompatibilityChecker />

    </React.StrictMode>
)