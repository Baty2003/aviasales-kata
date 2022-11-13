import React from 'react';

import { Main } from '../Main';

import appStyle from './App.module.scss';
const App = () => {
  return (
    <div className={appStyle['container']}>
      <header className={appStyle['header']}>
        <a href="#" className={appStyle['logo-header']}></a>
      </header>
      <Main />
      <footer className={appStyle['footer']}></footer>
    </div>
  );
};
export default App;
