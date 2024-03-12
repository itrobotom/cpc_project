import { React } from 'react';

import HeaderMain from '../../components/headerMain/HeaderMain.jsx';
import Footer from '../../components/footer/Footer.jsx';
import FaqContainer from './FaqContainer.jsx';
import { ContactTeacher } from './ContactTeacher.jsx';

export const FaqPage = () => {
  const bgColor = '#58a0dc'; //бирюза была '#4FD1C5'


  return (
    <div>
      <HeaderMain />
      <FaqContainer />
      <ContactTeacher />
      <Footer />
    </div>
  );
}