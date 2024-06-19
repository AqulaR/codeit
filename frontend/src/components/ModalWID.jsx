import React, { useState } from 'react';
import '../assets/css/modal.css';
import { IoCloseOutline } from "react-icons/io5";
import { GrLinkNext } from "react-icons/gr";

const ModalID = ({ isOpen, onClose, children, id, onupdate }) => {
  if (!isOpen) return null;
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [newWorkspaceName, setnewWorkspaceName] = useState('');

  const token = localStorage.getItem('authToken');

  const handleUpdateWorkspace = async (e) => {

    e.preventDefault();
    try {
      const responseUpdateWS = await fetch(`${serverUrl}/api/workspaces/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ "NewName": newWorkspaceName }),
      });
      onClose();
      onupdate();
    } catch (error) {
      console.log(`Ошибка: ${error.message}`);
    }

    console.log(newWorkspaceName);
  };

  const handleDeleteWS = async (e) => {
    e.preventDefault();
    try {
      const responseDeleteWS = await fetch(`${serverUrl}/api/workspaces/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      onClose();
      onupdate();
    } catch (error) {
      console.log(`Ошибка: ${error.message}`);
    }

    // console.log(newWorkspaceName);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content d-flex flex-colum gap-3" onClick={(e) => e.stopPropagation()}>
        <div className="d-flex justify-content-between">
          <h2>Настройки</h2>
          <button className="modal-close-button d-flex justify-content-center align-items-center" onClick={onClose}><IoCloseOutline className='scale_close' /></button>
        </div>
        <form className="d-flex flex-column gap-1" id={id} onSubmit={handleUpdateWorkspace}>
          <p>Введите новое имя</p>
          <div className="d-flex flex-row gap-1">
            <input type="text" className="lr-inpts" placeholder="Имя" value={newWorkspaceName} onChange={(e) => { setnewWorkspaceName(e.target.value) }} required />
            <button type="submit" value="Применить" className="dash_modal_btn d-flex justify-content-center align-items-center"><GrLinkNext /></button>
          </div>
        </form>
        <hr />
        <div className="d-flex justify-content-between align-items-top">
          <span className='pt-1'>Удалить проект</span>
          <input type="button" value="Удалить" className="modal_del_btn" onClick={handleDeleteWS} />
        </div>
      </div>
    </div>
  );
};

export default ModalID;