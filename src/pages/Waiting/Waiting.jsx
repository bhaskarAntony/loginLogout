import React, { useState, useEffect } from 'react';
import './style.css';

function Waiting() {
    const [quote, setQuote] = useState(null);
    const [message, setMessage] = useState([
        "While you wait, here's a travel tip: Pack light, travel far.",
        "Patience is a virtue! As you wait, remember: Good things come to those who wait.",
        "Waiting for your ride? How about a quick trivia: Did you know the first taxi service started in 1605 in London?",
        "Hang tight! Your ride is on its way. In the meantime, enjoy this quote: 'Life is a journey, not a destination.' - Ralph Waldo Emerson",
        "Waiting can be tough, but it's worth it! While you wait, here's a fun fact: The word 'taxi' comes from the word 'taximeter,' the device used to calculate fares."
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * message.length);
            setQuote(message[randomIndex]);
        }, 1000); // Change 5000 to the desired interval in milliseconds

        return () => clearInterval(interval);
    }, [message]);

    return (
        <div className='container-fluid waiting'>
            <p>{quote}</p>
            <img src="https://cdn.dribbble.com/users/1644328/screenshots/3920894/minion.gif" alt="" />
        </div>
    );
}

export default Waiting;
