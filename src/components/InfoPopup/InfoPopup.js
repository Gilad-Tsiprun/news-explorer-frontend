import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

function InfoPopup({ handleLoginOpen, name, isOpen, onClose, errStatus }) {
    const [statusText, setStatusText] = useState('Registration successfully completed!');
    useEffect(() => {
        setStatusText(errStatus ? 'Error' : 'Registration successfully completed!') //fix Error text
    }, [statusText, errStatus])

    useEffect(() => {
        if (!isOpen) return;
        const close = (e) => {
            if (e.key === 'Escape' || e.target.classList.contains('popup-box_opened')) {
                onClose();
            }
        }
        window.addEventListener('keydown', close)
        window.addEventListener('mousedown', close)
        return () => {
            window.removeEventListener('keydown', close);
            window.removeEventListener('mousedown', close);
        };
    }, [onClose, isOpen])

    return (
        <section className={`popup-box popup-box_type_${name} ${isOpen ? 'popup-box_opened' : ''}`}>
            <div className="popup-box__container">
                <button type="button" className="popup-box__action popup-box__action_btn_close opacity" onClick={onClose} />
                <h2 className="popup-box__title popup-box__title_black">{statusText}</h2>
                <div className="popup-box__signup">
                    <Link to='/' onClick={handleLoginOpen} className="popup-box__link popup-box__link_info">Sign in</Link>
                </div>
            </div>
        </section>
    )
}

export default InfoPopup;