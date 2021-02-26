import React from 'react';
import { Button } from './Button';
import './styles/PageNotFound.css';

const PageNotFound = ({ onClick }) => {
  return (
    <div className="pageNotFound">
      <h2 className="pageNotFound__text">
        Упс! Извините, такой страницы нет :(
      </h2>
      <Button onClick={onClick} buttonText={'На главную'} />
    </div>
  );
};

export default PageNotFound;
