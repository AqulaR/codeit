import React, { useState } from 'react';
import '../assets/css/Accordion.css'; // Подключаем файл стилей для аккордеона
import more from '../assets/imgs/more.png'

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <button className="accordion-btn d-flex flex-row justify-content-between gap-3" onClick={toggleAccordion}><div>{title}</div><img src={more} className={`pic_18 faq_img ${isOpen ? 'rotated' : 'closed'}`}/></button>
      <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Accordion;