import React, { useState, useEffect } from 'react';

const TypewriterPlaceholder = ({ onTextChange }) => {
    const placeholderTexts = [
        'I want to invest in AI based crypto Tokens',
        'Invest in Metaverse crypto Tokens',
        'Layer 1 blockchain based crypto Tokens',
        'Top 10 crypto Tokens',
        'Coincases which can 10x in a Year',
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let timeoutId;

        if (isTyping) {
            if (currentText.length < placeholderTexts[currentIndex].length) {
                timeoutId = setTimeout(() => {
                    setCurrentText(
                        placeholderTexts[currentIndex].slice(0, currentText.length + 1)
                    );
                }, 100); // Adjust typing speed here (lower value = faster)
            } else {
                timeoutId = setTimeout(() => {
                    setIsTyping(false);
                }, 1000); // Pause at the end of typing
            }
        } else {
            if (currentText.length > 0) {
                timeoutId = setTimeout(() => {
                    setCurrentText(currentText.slice(0, -1));
                }, 50); // Adjust erasing speed here (lower value = faster)
            } else {
                timeoutId = setTimeout(() => {
                    setIsTyping(true);
                    setCurrentIndex(
                        (prevIndex) => (prevIndex + 1) % placeholderTexts.length
                    );
                }, 500); // Pause before starting next word
            }
        }

        return () => clearTimeout(timeoutId);
    }, [currentText, currentIndex, isTyping]);

    useEffect(() => {
        onTextChange(currentText);
    }, [currentText, onTextChange]);

    return null; // This component doesn't render anything visible
};

export default TypewriterPlaceholder;