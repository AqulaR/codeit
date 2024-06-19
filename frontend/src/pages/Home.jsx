// import { useState } from 'react'
// import viteLogo from '/vite.svg'
import logo from '../assets/imgs/logo.png'
import somecode from '../assets/imgs/somecode.png'
import go from '../assets/imgs/go.svg'
import ava from '../assets/imgs/ava.png'
import arrow_right from '../assets/imgs/arrow_right.png'
import adv from '../assets/imgs/adv.png'
import git_repo from '../assets/imgs/git_repo.png'
import tg from '../assets/imgs/tg.png'
import vk from '../assets/imgs/vk.png'
import udobno from '../assets/imgs/udobno.png'
import web from '../assets/imgs/web.png'
import symbol from '../assets/imgs/Symbol.png'
import simple from '../assets/imgs/simple.png'
import more from '../assets/imgs/more.png'
import fast from '../assets/imgs/fast.png'
import env from '../assets/imgs/env.png'
import code_easy from '../assets/imgs/code_easy.png'
import code from '../assets/imgs/code.png'
import coding from '../assets/imgs/coding.png'
import '../assets/css/style.css'
import '../assets/css/bootstrap.min.css'
import '../assets/scripts/script'
import React, { useEffect, useState } from "react"
import Accordion from '../components/Accordion';
import { Link } from 'react-router-dom'

function Home() {
    const [url, setUrl] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setUrl('/dash');
        } else {
            setUrl('/login');
        }
    });
    
    console.log(url);

    return (
        <>
            <div className="offer_block_outer">
                <div className="main_wrapper">
                    <div className="offer_block_inner d-flex flex-column justify-content-between">
                        <header className="d-flex justify-content-between align-items-center">
                            <img src={logo} alt="CodeIT - Онлайн редактор для кода" className="logo" />
                            {/* <button className="regular_button" data-target="signup" >
                            Начать
                        </button> */}
                            <Link to={ url } className="regular_button non_a">Начать</Link>
                        </header>
                        <div className="offer_mid d-flex justify-content-between align-items-center pt-5 mt-5 position-relative">
                            <div className="offer_text d-flex flex-column gap-3">
                                <h1 className="offer_h1 fs-64">
                                    СodeIT - Легкость простота и удобство
                                </h1>
                                <div className="additional_text fs-16">
                                    Много программистов работает с нами. Попробуйте
                                    и вы прямо сейчас! Наш дивиз - легкость простота
                                    и удобство.
                                </div>
                            </div>
                            <img src={somecode} alt="" className="offer_img" />
                        </div>
                        <div className="offer_bottom">
                            <Link to={ url } className="but_border d-flex justify-content-between gap-3 non_a">
                                <span className="button_no_button_text">Начать сейчас</span>
                                <img src={go} alt="Начать" className="pt-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_wrapper mt-5 mb-5">
                <div className="navigation d-flex flex-wrap justify-content-between">
                    <div className="nav_big_block d-flex flex-column">
                        <span className="navigation_h2 mt-5 fs-40">CodeIT</span>
                        <div className="navigation_addition_text">
                            <span className="fs-22">Революция в мире редакторов</span>
                        </div>
                    </div>
                    <div className="nav_sml_block d-flex flex-column justify-content-between">
                        <img src={ava} alt="О нас" className="sml_blck_img" />
                        <span className="navigation_addition_text">
                            Узнайте больше продукте
                        </span>
                        <a href="#why_us" className="d-flex align-items-center justify-content-between non_a">
                            <span className="navigation_h3 fs-28">О нас</span>
                            <img src={arrow_right} alt="О нас" />
                        </a>
                    </div>
                    <div className="nav_sml_block d-flex flex-column justify-content-between">
                        <img src={adv} alt="Плюсы работы с нами" className="sml_blck_img" />
                        <span className="navigation_addition_text">
                            Найдите ответы на все вопросы
                        </span>
                        <a href="#FAQ" className="d-flex align-items-center justify-content-between non_a">
                            <span className="navigation_h3 fs-28">FAQ</span>
                            <img src={arrow_right} alt="Плюсы" />
                        </a>
                    </div>
                    <div className="nav_sml_block d-flex flex-column align-items-center git_repo_card">
                        <a href="https://github.com/AqulaR/kurs_rab" className="non_a d-flex align-items-center justify-content-center">
                            <img src={git_repo} className="sml_blck_img_soc" alt="Git репозиторий" />
                        </a>
                    </div>
                    <div className="nav_sml_block d-flex flex-column align-items-center">
                        <a href="https://web.telegram.org" className="non_a d-flex align-items-center justify-content-center">
                            <img src={tg} className="sml_blck_img_soc" alt="Мы в телеграмме" />
                        </a>
                    </div>
                    <div className="nav_sml_block d-flex flex-column align-items-center">
                        <a href="https://vk.com" className="non_a d-flex align-items-center justify-content-center">
                            <img src={vk} className="sml_blck_img_soc" alt="Мы в вконтакте" />
                        </a>
                    </div>
                    <div className="nav_big_block d-flex flex-column justify-content-between gap-4 big_block_princ">
                        <span className="navigation_addition_text">
                            Наши принципы
                        </span>
                        <div className="our_statements d-flex justify-content-around mb-4">
                            <div className="statement d-flex flex-column gap-2 align-items-center">
                                <img src={web} alt="web" className="statement_blck_img" />
                                <span className="statement_text fs-22">Веб</span>
                            </div>
                            <div className="statement d-flex flex-column gap-2 align-items-center">
                                <img src={coding} alt="web" className="statement_blck_img" />
                                <span className="statement_text fs-22">Разработка</span>
                            </div>
                            <div className="statement d-flex flex-column gap-2 align-items-center">
                                <img src={symbol} alt="web" className="statement_blck_img" />
                                <span className="statement_text fs-22">Сборка</span>
                            </div>
                        </div>
                    </div>
                    <div className="nav_sml_block d-flex flex-column start_pr_btn">
                        <span className="navigation_addition_text mt-4">
                            Попробуйте уже сейчас
                        </span>
                        <Link to={ url } className="d-flex align-items-center justify-content-between non_a cursor-pointer">
                            <span className="navigation_h3 fs-28">Начать</span>
                            <img src={arrow_right} alt="Плюсы" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="blue_background" id="why_us">
                <div className="main_wrapper d-flex flex-column gap-5">
                    <span className="pres_head mb-5 fs-128">
                        Представляем вам наш редактор
                    </span>
                    <div className="pres_con d-flex justify-content-around align-items-start mt-5 flex-wrap gap-5">
                        <div className="pres_el d-flex flex-column">
                            <span className="pres_el_header fs-128"> 2+ </span>
                            <span className="pres_el_mid fs-24"> Часов </span>
                            <span className="pres_el_sml"> Сохраняется </span>
                        </div>
                        <div className="pres_el d-flex flex-column">
                            <span className="pres_el_header fs-128"> 90% </span>
                            <span className="pres_el_mid fs-24"> Отдачи </span>
                            <span className="pres_el_sml"> В рабочее время </span>
                        </div>
                        <div className="pres_el d-flex flex-column">
                            <span className="pres_el_header fs-128"> 60% </span>
                            <span className="pres_el_sml">
                                Пользователей используют нас
                                для ведения разработки в компаниях.
                            </span>
                        </div>
                    </div>
                    {/* <button className="regular_button reg_but_width align-self-center mt-5" data-target="signup"  >
                    Узнать больше
                </button> */}
                    <Link to={ url } className="regular_button reg_but_width align-self-center mt-5 non_a color_white">Узнать больше</Link>
                </div>
            </div>
            <div className="main_wrapper mt-5 mb-5" >
                <div className="blocks_gap d-flex flex-column text-center" id="advantages">
                    <div className="comfort_header d-flex flex-column gap-5">
                        <span className="block_header fs-96">
                            Работайте где вам
                            удобно
                        </span>
                        <span className="block_header_addition_text fs-24 align-self-center">
                            Работайте из дома на улице или в кафе. Это ваш выбор!
                        </span>
                    </div>
                    <div className="comfort_container d-flex justify-content-around">
                        <div className="comfort_el d-flex flex-column align-items-center gap-1">
                            <img src={fast} alt="CodeIT - Быстро" className="comfort_img" />
                            <span className="comfort_con_heading fs-24">Быстро</span>
                            <span className="comfort_con_text fs-18">Наш редактор значительно ускоряет процесс сборки кода, запуская его быстрее, чем локальные решения.</span>
                        </div>
                        <div className="comfort_el d-flex flex-column align-items-center gap-1">
                            <img src={udobno} alt="CodeIT - Удобно" className="comfort_img"
                            />
                            <span className="comfort_con_heading fs-24">Удобно</span>
                            <span className="comfort_con_text fs-18">Делитесь вашим кодом со всеми! Мы предлагаем конфиденциальную централизованную среду.</span>
                        </div>
                        <div className="comfort_el d-flex flex-column align-items-center gap-1">
                            <img src={simple} alt="CodeIT - Легко" className="comfort_img" />
                            <span className="comfort_con_heading fs-24">Легко</span>
                            <span className="comfort_con_text fs-18"> От регистрации до создания проекта отделяет всего одна кнопка. Попробуйте и вы!</span>
                        </div>
                    </div>
                    <Link to={ url } className="button_no_button non_a d-flex justify-content-between gap-3 align-self-center">
                        <span className="button_no_button_text">Начать сейчас</span>
                        <img src={go} alt="Начать" className="pt-1" />
                    </Link>
                </div>
                <div className="blocks_gap d-flex flex-column text-center" id="principles">
                    <div className="speedup_header d-flex flex-column gap-5">
                        <span className="block_header fs-96">
                            Ускорьте ваш
                            рабочий процесс
                        </span>
                        <span className="block_header_addition_text fs-24 align-self-center">
                            Познайте что такое скорость разработки.
                        </span>
                    </div>
                    <div className="speedup_dwn position-relative d-flex flex-row-reverse">
                        <div className="speedup_img_con position-absolute">
                            <img src={code} alt="" />
                        </div>
                        <div className="speedup_three_con d-flex justify-content-between pt-4">
                            <div className="three_item d-flex">
                                <div className="spedup_el d-flex flex-column gap-2">
                                    <span className="fs-24 f_bold">Копируйте ваш код</span>
                                    <span className="fs-18">
                                        Наша облачная среда позволяет копировать код из
                                        Git-репозитория по щелчку одной кнопки.
                                    </span>
                                </div>
                                <div className="spedup_el d-flex flex-column gap-2">
                                    <span className="fs-24 f_bold">Предпросмотр</span>
                                    <span className="fs-18">Экономьте ваше время. Превью кода находится справа, со всеми инструментами для более комплексного доступа.</span>
                                </div>
                                <div className="spedup_el d-flex flex-column gap-2">
                                    <span className="fs-24 f_bold">Делитесь</span>
                                    <span className="fs-18">Делитесь кодом со всеми. Приглашайте людей для просмотра. Создавайте и творите!</span>
                                </div>
                            </div>
                            <a href="https://github.com/AqulaR/kurs_rab" className="button_no_button d-flex justify-content-between gap-3 ps-2 spedup_btn non_a" data-target="signup" >
                                <span className="button_no_button_text">Репозиторий Git</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="blocks_gap d-flex flex-column" id="integration">
                    <div className="simple_header d-flex flex-column gap-5 mt-5">
                        <span className="block_header fs-96"> Легкая интеграция </span>
                        <span className="fs-24">
                            Испытайте все преимущества нашей системы
                        </span>
                    </div>
                    <div className="simple_three_con d-flex flex-row flex-wrap">
                        <div className="simple_el d-flex flex-column gap-4">
                            <img src={code_easy} alt="" className="pic_40" />
                            <span className="d-flex flex-column gap-1">
                                <span className="fs-24 f_bold">VS code - как синтаксис</span>
                                <span className="fs-18">В нашем редакторе имеется полная поддержка синтаксиса как в VS code.</span>
                            </span>
                        </div>
                        <div className="simple_el d-flex flex-column gap-4">
                            <img src={git_repo} alt="" className="pic_40" />
                            <span className="d-flex flex-column gap-1">
                                <span className="fs-24 f_bold">GitHub Репозиторий</span>
                                <span className="fs-18">Скопируйте ваш код прямо в гит из интерфейса.</span>
                            </span>
                        </div>
                        <div className="simple_el d-flex flex-column gap-4">
                            <img src={env} alt="" className="pic_40" />
                            <span className="d-flex flex-column gap-1">
                                <span className="fs-24 f_bold">Созданые среды</span>
                                <span className="fs-18">Мы используем контейнеры для настройки вашейсреды.</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="blocks_gap CTA_on_page d-flex flex-column text-center align-items-center" >
                    <div className="CTA_on_page_head fs-68">
                        Присоединяйтесь к нам и<br />начните творить!
                    </div>
                    {/* <button className="regular_button" data-target="signup"  >
                    Попробуйте сейчас
                </button> */}
                    <Link to={ url } className="regular_button non_a">Попробуйте сейчас</Link>
                </div>
                <div className="blocks_gap d-flex flex-column" id="FAQ">
                    <div className="FAQ_header d-flex flex-column gap-5 mt-5">
                        <span className="block_header fs-96"> Вопросы и ответы </span>
                    </div>
                    <div className="FAQ_con d-flex">
                        <div className="faq_col d-flex flex-column fit-content-h">
                            <div className="faq_q d-flex flex-column">
                                <Accordion title="Каковы преимущества использования онлайн компилятора?" content="Доступность в любом браузере без необходимости установки специализированного программного обеспечения." />
                            </div>
                            <span className="line"></span>
                            <div className="faq_q d-flex flex-column">
                                <Accordion title="Каковы преимущества использования онлайн компилятора?" content="Доступность в любом браузере без необходимости установки специализированного программного обеспечения." />
                            </div>
                            <span className="line"></span>
                            <div className="faq_q d-flex flex-column">
                                <Accordion title="Какие языки программирования поддерживаются в онлайн компиляторе?" content="Поддерживаются широко используемые языки программирования, такие как JavaScript, Python, Java, html, css и другие." />
                            </div>
                            <span className="line"></span>
                            <div className="faq_q d-flex flex-column">
                                <Accordion title="Могу ли я выполнять сложные программы с помощью онлайн компилятора?" content="Да, вы можете выполнять программы различной сложности, но следует учитывать ограничения, которые могут быть связаны с ресурсами сервера и производительностью веб-интерфейса." />
                            </div>
                        </div>
                        <div className="faq_col d-flex flex-column fit-content-h">
                            <div className="faq_q d-flex flex-column">
                                <Accordion title="Безопасно ли использовать онлайн компиляторы?" content="Мы используем улучшенные меры безопасности, но рекомендуется избегать передачи конфиденциальной информации через онлайн компилятор и использовать его в своих прямых задачах." />
                            </div>
                            <span className="line"></span>
                            <div className="faq_q d-flex flex-column">
                                <Accordion title="Как я могу сохранить или поделиться своим кодом из онлайн компилятора?" content="Достаточно сохранить код, получить ссылку и поделиться." />
                            </div>
                            <span className="line"></span>
                            <div className="faq_q d-flex flex-column">
                                <Accordion title="Могу ли я использовать онлайн компилятор для учебных целей?" content="Да, наш продукт подходит для учебных целей, он предоставляет удобное и безопасное окружение для изучения и практики языков программирования без необходимости установки дополнительного программного обеспечения." />
                            </div>
                            <span className="line"></span>
                            <div className="faq_q d-flex flex-column">
                                <Accordion title="Какова производительность онлайн компилятора по сравнению с локальным компилятором?" content="Производительность очень зависит от качества вашего соединения. Однако для большинства задач производительность мобильного интернета будет достаточной для обучения, тестирования и небольших проектов." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_wrapper">
                <div className="CTA flex-row flex-wrap">
                    <span className="d-flex flex-column gap-5 fit-content-w">
                        <span className="CTA_head fs-96">Присоединяйтесь <br /> к нам!</span>
                        {/* <button className="regular_button" data-target="signup" >
                        Попробуйте сейчас
                    </button> */}
                        <Link to={ url } className="regular_button non_a color_white">Попробуйте сейчас</Link>
                    </span>
                    <div className="socials_con d-flex flex-column gap-2 pt-5">
                        <a href="https://github.com/AqulaR/kurs_rab" className="socials fs-24">Git-Репозиторий</a>
                        <a href="https://web.telegram.org" className="socials fs-24">Телеграмм</a>
                        <a href="https://vk.com" className="socials fs-24">Вконтакте</a>
                    </div>
                </div>
                <footer className="d-flex flex-column align-items-center text-center py-3 gap-3">
                    <div className="footer_part d-flex justify-content-between align-items-center py-3">
                        <a href="#">
                            <img src={logo} alt="CodeIT" className="logo" />
                        </a>
                        <div className="nav d-flex gap-4">
                            <a href="#why_us">Почему мы</a>
                            <a href="#advantages">Преимущества</a>
                            <a href="#principles">Принципы</a>
                            <a href="#integration">Интеграция</a>
                            <a href="#FAQ">FAQ</a>
                        </div>
                    </div>
                    <span className="sec_text">© “Codeit”, 2024. Все права защищены.</span>
                </footer>
            </div>
            {/* <script src='../assets/scripts/script.js'></script> */}
        </>
    )
}

export default Home
