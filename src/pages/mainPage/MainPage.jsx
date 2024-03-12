import { React } from 'react';

import HeaderMain from "../../components/headerMain/HeaderMain.jsx"
import SliderCover from './SliderCover.jsx';
import Mission from './Mission.jsx';
import Advantages from '../../pages/mainPage/Advantages.jsx'
import ActionCpc from './ActionCpc.jsx';
import Galery from './Galery.jsx';
import Reviews from '../../pages/mainPage/Reviews.jsx';
import Partners from '../../pages/mainPage/Partners.jsx';
import News from './News.jsx';
import Footer from '../../components/footer/Footer.jsx';
import { positions } from '@mui/system';

import { Link } from 'react-router-dom';

import "./MainPage.css"

export function MainPage() {
  const bgColor = '#58a0dc'; //бирюза была '#4FD1C5'
  // синий крафт 
  // background-color: #a7bed8; 159, 187, 212
  // бирюза 
  // синий нейтральный с лого
  // #58a0dc, 88, 163, 220
  // синиий с лого контрастный
  // #3b75ec , 59, 117, 236*

  return (
    <div>
      <HeaderMain />
      <SliderCover />
      {/* миссия */}
      <Mission />
      {/* о деятельности тестом и видео рядом*/}
      <ActionCpc bgColor={bgColor}/>
      {/* галерея */}
      <Galery />
      {/* преимущества обучения */}
      <Advantages bgColor={bgColor}/>
      {/* отзывы */}
      <div id="reviews">
        <Reviews bgColor={bgColor}/>
      </div>
      {/* Наши партнеры */}
      <Partners />
      {/* Новости */}
      <News bgColor={bgColor}/>
      
      <Footer />
    </div>
  );
}