import './HeaderMain.css'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';

import { React, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk } from '@fortawesome/free-brands-svg-icons';
import EmailIcon from '@mui/icons-material/Email';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { logout } from '../../store/reducers/auth';

import { IconButton, Button, Box } from "@mui/material";

import { useSelector, useDispatch } from 'react-redux';

import { Link } from "react-router-dom";

function HeaderMain() { //function Header({head, isLogin, setIsLogin})

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isLogin = Boolean(useSelector(state => state.auth.data)); 
  const dispatсh = useDispatch();

  const onClickLogout = () => {
    dispatсh(logout());
    window.localStorage.removeItem('token'); //удаляем токен из памяти браузера
  }

  const handleReviewsClick = () => {
    const reviewsSection = document.getElementById('reviews');
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="header-container">
      <Box
        sx={{
          position: "relative",
          width: "100%",
        }}
      >
        <div className="header">
          <div className="center-logo">
          <Link to={"/"}>
            <IconButton aria-label="add" className="icon">
              <img src="/logo/cpcNew.png" alt="logo ЦПК" style={{ height: '40px'}}/>
            </IconButton>
          </Link>
          </div>
          <div className={`left-buttons ${menuOpen ? 'open' : ''}`}>
            <Link to={"/"}>
              <button className="button-home">Главная</button>
            </Link>
            <Link to={"/news"}>
              <button className="button-home">История успеха</button>
            </Link>
            <Link to={"/learn"}>
              <button className="button-home">Услуги центра</button>
            </Link>            
            <Link to={"/faq"}>
              <button className="button-home">Ответы на вопросы</button>
            </Link>
            <Link to={"/"}>
              <button className="button-home" onClick={handleReviewsClick}>Отзывы</button>
            </Link>
            
          </div>
          <div className="right-icons">
            <Box
              sx={{
                paddingRight: "10rem",
              }}
            >
              {/* цвет иконок серый #808080 */}    
              <IconButton aria-label="email">
                <a href="mailto:cpc@education70.ru" target="_blank">
                  <EmailIcon  style={{ color: 'grey', verticalAlign: 'middle' }}/>
                </a>
              </IconButton>
              <IconButton aria-label="vk">
                <a href="https://vk.com/cpc.tomsk" target="_blank">
                  <FontAwesomeIcon icon={faVk} style={{ color: "#808080", fontSize: "20px", verticalAlign: 'middle' }} />
                </a>
              </IconButton>
              <IconButton aria-label="youtube">
                <a href="https://youtu.be/y5L7gmQhcWI?si=Zw2ONelvaiOgqn0D" target="_blank">
                  <YouTubeIcon style={{ color: 'grey', verticalAlign: 'middle' }}/>
                </a>
              </IconButton>
            </Box>
            <IconButton aria-label="add" className="icon">
              {isLogin && 
                <Link to={"/addnews"}> 
                  <NewspaperIcon style={{ color: 'grey' }}/>
                </Link>
              }
            </IconButton>
            <IconButton aria-label="add" className="icon">
              {isLogin && 
                <Link to={"/addprogram"}> 
                  <AddCircleOutlineIcon style={{ color: 'grey' }}/>
                </Link>
              }
            </IconButton>

            <IconButton aria-label="add" className="icon">
              {isLogin ? 
                
                <LogoutIcon style={{ color: 'grey' }} onClick={() => onClickLogout()}/>
                 : 
                <Link to={"/login"}> 
                  <LoginIcon style={{ color: 'grey' }}/> 
                </Link>
              }
            </IconButton>
          </div>
          <IconButton onClick={toggleMenu} aria-label="menu">
            <MenuIcon />
          </IconButton>
        </div>
        <div className="separator"></div>
      </Box>
    </div>
  );
}

export default HeaderMain;
