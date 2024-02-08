import './Header.css'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

import { logout } from '../../store/reducers/auth';
import { IconButton, Button, Box } from "@mui/material";

import { useSelector, useDispatch } from 'react-redux';

import { Link } from "react-router-dom";

function Header() { //function Header({head, isLogin, setIsLogin})
  const isLogin = Boolean(useSelector(state => state.auth.data)); 
  const dispatсh = useDispatch();

  const onClickLogout = () => {
    dispatсh(logout());
    window.localStorage.removeItem('token'); //удаляем токен из памяти браузера
  }

  return (
    <div className="header-container">
      <Box
        sx={{
          position: "fixed",
          width: "100%",
          zIndex: 1, // Установите значение z-index шапки, тогда она перекроет карточки
        }}
      >
        <div className="header">
          <div className="center-logo">
            {/* <IconButton aria-label="add" className="icon">
              <img src="/logo/cpc.png" alt="Ваше изображение" style={{ height: '80px'}}/>
            </IconButton> */}
            <IconButton aria-label="add" className="icon">
              <img src="/logo/logonew2.png" alt="Ваше изображение" style={{ height: '80px'}}/>
            </IconButton>
          </div>
          <div className="left-buttons">
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
            <Link to={"/reviews"}>
              <button className="button-home">Отзывы</button>
            </Link>
          </div>
          <div className="right-icons">
            <Box
            sx={{
              paddingRight: "10rem",
            }}
            >
              <IconButton aria-label="email">
                <a href="mailto:cpc@education70.ru">
                  <EmailIcon  style={{ color: 'grey' }}/>
                </a>
              </IconButton>

              <IconButton aria-label="facebook">
                <a href="https://vk.com/cpc.tomsk" target="_blank">
                  <FacebookIcon style={{ color: 'grey' }}/>
                </a>
              </IconButton>

              <IconButton aria-label="youtube">
                <a href="https://youtu.be/y5L7gmQhcWI?si=Zw2ONelvaiOgqn0D" target="_blank">
                  <YouTubeIcon style={{ color: 'grey' }}/>
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
              {isLogin && <AddCircleOutlineIcon style={{ color: 'grey' }}/>}
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
        </div>
        <div className="separator"></div>
      </Box>
    </div>
  );
}

export default Header;
