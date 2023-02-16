import { BrowserView, MobileView } from 'react-device-detect';
import './App.css';
import React, { useState } from 'react';
import { getCookie } from './config/Cookie';
import MobileNav from './main/MobileNav';
import MobileMain from './main/MobileMain.js';
import WebNav from './main/WebNav';
import WebMain from './main/WebMain.js';
import { useEffect } from 'react';
// import { useEffect } from 'react';

function App() {
  const accessToken = getCookie('accessToken');

  const [isBookCase, setIsBookCase] = useState(true);
  const changeBookCase = (e) => {
    setIsBookCase(e);
  };

  const [homeState, setHomeState] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  return (
    <div id='App'>
      {/* 브라우저인 경우 */}
      <BrowserView>
        <div className='justify-center App'>
          {accessToken !== undefined ? (
            <div>
              <WebNav setHomeState={setHomeState} />
              <hr className='mb-3 border-slate-500/75' />
            </div>
          ) : null}
          <WebMain homeState={homeState} setHomeState={setHomeState} />
        </div>
      </BrowserView>
      {/* 모바일인 경우 */}
      <MobileView>
        <div className='justify-center max-w-sm App'>
          {/*만약 주소가 sign in, sign up, /이라면 nav가 안 보이게*/}
          {accessToken !== undefined ? (
            <div>
              <MobileNav changeIsBookCase={changeBookCase} />
              <hr className='mb-3 border-slate-500/75' />
            </div>
          ) : null}
          <MobileMain isBookCase={isBookCase} />
        </div>
      </MobileView>
    </div>
  );
}

export default App;
