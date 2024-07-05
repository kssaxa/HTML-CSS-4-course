import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from "./Header.jsx";
import Gallery from "./Gallery.jsx";
import Mark from "./Mark.jsx";

const myImages = [
    'https://i.pinimg.com/736x/a2/ef/7b/a2ef7bdef4126e5f299883f6168c0331.jpg',
    'https://i.pinimg.com/564x/30/1d/39/301d39faaa9aa33e91bb1e36c7c93041.jpg',
    'https://i.pinimg.com/736x/27/77/4a/27774aa1735b12f67aef7f65210497a6.jpg',
];

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Header />
        <div className='container'>
            <Gallery images={myImages}/>
            <Mark/>
        </div>
    </React.StrictMode>
)