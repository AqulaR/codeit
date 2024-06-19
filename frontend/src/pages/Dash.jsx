import React, { useEffect, useState } from "react"
import logo from '../assets/imgs/logo.png'
import edit_workspace from '../assets/imgs/edit_workspace.png'
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import Modal from '../components/ModalAdd';
import ModalID from '../components/ModalWID';
import '../assets/css/dash.css'
import { FaPlus } from "react-icons/fa6";
import { RiImportFill } from "react-icons/ri";
import { IoCloseOutline } from "react-icons/io5";

function Dash() {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const navigate = useNavigate();
  const [allWorkspaces, setAllWorkspaces] = useState([]);
  const [userData, setUserData] = useState([]);
  const [workspaceName, setWorkspaceName] = useState('');

  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => setIsModalOpen1(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalId, setModalId] = useState(null);

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const openModal2 = () => setIsModalOpen2(true);
  const closeModal2 = () => setIsModalOpen2(false);

  const openModal = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setModalId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalId(null);
  };


  const token = localStorage.getItem('authToken');

  if (!token) {
    console.log("token отсутствует");
    navigate('/login');
    return 0
  }

  useEffect(() => {

    if (!token) {
      console.log("token отсутствует");
    }

    const fetchData = async () => {
      try {
        const responseAllWorkspaces = await fetch(`${serverUrl}/api/workspaces/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const Workspaces = await responseAllWorkspaces.json();
        const wData = Workspaces.data;
        wData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAllWorkspaces(wData);

        const responseUserData = await fetch(`${serverUrl}/api/auth/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const userData = await responseUserData.json();
        setUserData(userData.data);
      } catch (error) {
        console.error('Ошибка в обращении:', error);
      }
    };

    fetchData();
  }, []);

  const [repos, setRepos] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (allWorkspaces.length != 0) {
      const withUrlArray = allWorkspaces.filter(item => item.url);
      const withoutUrlArray = allWorkspaces.filter(item => !item.url);

      setRepos(withUrlArray);
      setProjects(withoutUrlArray);
    }
  }, [allWorkspaces]);

  // console.log("repo:", repos);
  // console.log("prjc:", projects);

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    try {
      const responseCreateWS = await fetch(`${serverUrl}/api/workspaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ "name": workspaceName }),
      });
      const createdProject = await responseCreateWS.json();
      console.log(createdProject);
      DataWSUpdate();
    } catch (error) {
      console.log(`Ошибка: ${error.message}`);
    }
    closeModal1();
  };

  const handleOpenWorkspace = async (e) => {
    e.preventDefault();
    const url = e.currentTarget.id;
    window.open(url, '_blank');
  };

  const [repoUrl, setRepoUrl] = useState('');

  const handleImportRepo = async (e) => {
    e.preventDefault();
    try {
      const responseImportRepo = await fetch(`${serverUrl}/api/workspaces/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ "repoUrl": repoUrl }),
      });

      const importedRepo = await responseImportRepo.json();
      console.log(importedRepo);
      DataWSUpdate();
    } catch (error) {
      console.log(`Ошибка: ${error.message}`);
    }
  };

  const DataWSUpdate = async () => {
    try {
      const responseAllWorkspaces = await fetch(`${serverUrl}/api/workspaces/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const Workspaces = await responseAllWorkspaces.json();
      const wData = Workspaces.data;
      wData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAllWorkspaces(wData);
    } catch (error) {
      console.error('Ошибка в обращении:', error);
    }
  };

  const [activeContent, setActiveContent] = useState('recent');

  const renderContent = () => {
    switch (activeContent) {
      case 'recent':
        return (
          <>
            <div className="d-flex justify-content-between">
              <span className="dash_content_header">Последние</span>
              <button onClick={openModal1} className="dash_btn d-flex justify-content-center align-items-center"><FaPlus className="dash_btn_scale" /></button>
            </div>
            <div className="d-flex flex-wrap gap-3">
              {allWorkspaces.map((data, index) => (
                <button key={index} onClick={handleOpenWorkspace} id={`/workspace?id=${data._id}`} className="round_dash_el d-flex flex-column justify-content-between px-4 py-3">
                  <div className="round_dash_el_top d-flex flex-row justify-content-between gap-4">
                    <span className="project_name">{data.name}</span>
                    <input type="image" name="edit" id={data._id} src={edit_workspace} onClick={(e) => openModal(e, data._id)} className="editWS" />
                  </div>
                  <span className="date_edited align-self-start">{format(data.createdAt, "dd.MM.yyyy")}</span>
                </button>
              ))}
            </div>
          </>
        );
      case 'repos':
        return (
          <>
            <div className="d-flex justify-content-between">
              <span className="dash_content_header">Репозитории</span>
              <button onClick={openModal2} className="dash_btn d-flex justify-content-center align-items-center"><RiImportFill /></button>
            </div>
            <div className="d-flex flex-wrap gap-3">
              {repos.map((data, index) => (
                <button key={index} onClick={handleOpenWorkspace} id={`/workspace?id=${data._id}`} className="round_dash_el d-flex flex-column justify-content-between px-4 py-3">
                  <div className="round_dash_el_top d-flex flex-row justify-content-between gap-4">
                    <span className="project_name">{data.name}</span>
                    <input type="image" name="edit" id={data._id} src={edit_workspace} onClick={(e) => openModal(e, data._id)} className="editWS" />
                  </div>
                  <span className="date_edited align-self-start">{format(data.createdAt, "dd.MM.yyyy")}</span>
                </button>
              ))}
            </div>
          </>
        );
      case 'projects':
        return <>
          <div className="d-flex justify-content-between">
            <span className="dash_content_header">Проекты</span>
            <button onClick={openModal1} className="dash_btn d-flex justify-content-center align-items-center"><FaPlus className="dash_btn_scale" /></button>
          </div>
          <div className="d-flex flex-wrap gap-3">
            {projects.map((data, index) => (
              <button key={index} onClick={handleOpenWorkspace} id={`/workspace?id=${data._id}`} className="round_dash_el d-flex flex-column justify-content-between px-4 py-3">
                <div className="round_dash_el_top d-flex flex-row justify-content-between gap-4">
                  <span className="project_name">{data.name}</span>
                  <input type="image" name="edit" id={data._id} src={edit_workspace} onClick={(e) => openModal(e, data._id)} className="editWS" />
                </div>
                <span className="date_edited align-self-start">{format(data.createdAt, "dd.MM.yyyy")}</span>
              </button>
            ))}
          </div>
        </>;
      case 'profile':
        return <>
          <div className="d-flex justify-content-between align-items-center">
            <span className="dash_content_header">Профиль</span>
          </div>
          <div className="profile_content_outer d-flex flex-column gap-1">
            <div className="d-flex gap-5 justify-content-between profile_content">
              <span className="dash_profile_text">Ваш id:</span>
              <span className="dash_profile_text">{userData._id}</span>
            </div>
            <div className="d-flex gap-5 justify-content-between profile_content">
              <span className="dash_profile_text">Логин:</span>
              <span className="dash_profile_text">{userData.username}</span>
            </div>
            <div className="d-flex gap-5 justify-content-between profile_content">
              <span className="dash_profile_text">Почта:</span>
              <span className="dash_profile_text">{userData.email}</span>
            </div>
            {/* <div className="d-flex gap-5">
              <span className="dash_profile_text">Пароль:</span>
              <span className="dash_profile_text">Николай</span>
            </div> */}
          </div>
          <button className="dash_btn_exit" onClick={() => { localStorage.clear(); navigate('/login');}} ><span>Выход</span></button>
        </>;
      default:
        return <div>dashboard</div>;
    }
  };

  return (
    <div className="dash_content_outer d-flex flex-row justify-content-between gap-5 w-100 h-100 pe-5">
      <Modal isOpen={isModalOpen1} onClose={closeModal1}>
        <div className="d-flex justify-content-between">
          <h2>Создание</h2>
          <button className="modal-close-button d-flex justify-content-center align-items-center" onClick={closeModal1}><IoCloseOutline className='scale_close' /></button>
        </div>
        <p>Введите имя нового проекта</p>
        <form className="d-flex flex-column gap-4" onSubmit={handleCreateWorkspace}>
          <div className="d-flex flex-column gap-3">
            <input type="text" className="lr-inpts" placeholder="Имя" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} required />
          </div>
          <input type="submit" value="Создать" className="lr-subm" />
        </form>
      </Modal>
      <Modal isOpen={isModalOpen2} onClose={closeModal2}>
        <div className="d-flex justify-content-between">
          <h2>Импорт</h2>
          <button className="modal-close-button d-flex justify-content-center align-items-center" onClick={closeModal2}><IoCloseOutline className='scale_close' /></button>
        </div>
        <p>Введите URL для импорта</p>
        <form className="d-flex flex-column gap-4" onSubmit={handleImportRepo}>
          <div className="d-flex flex-column gap-3">
            <input type="text" className="lr-inpts" placeholder="URL проекта" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} required />
          </div>
          <input type="submit" value="Создать" className="lr-subm" />
        </form>
      </Modal>
      <ModalID isOpen={isModalOpen} onClose={closeModal} id={modalId} onupdate={DataWSUpdate} />
      <div className="dash_left d-flex flex-column justify-content-between pb-3 h-100">
        <div className="dash_upper_con d-flex flex-column w-100">
          <button onClick={() => setActiveContent('recent')} className="dash_left_el d-flex flex-row align-items-center px-3">
            Последние
          </button>
          <button onClick={() => setActiveContent('projects')} className="dash_left_el d-flex flex-row align-items-center px-3">
            Проекты
          </button>
          <button onClick={() => setActiveContent('repos')} className="dash_left_el d-flex flex-row align-items-center px-3">
            Репозитории
          </button>
          {/* <button onClick={() => setActiveContent('settings')} className="dash_left_el d-flex flex-row align-items-center px-3">
            Настройки
          </button> */}
        </div>
        <button onClick={() => setActiveContent('profile')} className="dash_left_el d-flex flex-row align-items-center px-3">
          Профиль
        </button>
      </div>
      <div className="dash_content py-3 d-flex flex-column gap-4 h-100 w-100">
        {renderContent()}
      </div>
    </div>
  )
}

export default Dash
