import Search from './Search';
import Featured from './Featured';
import MSearch from './mobileSearch'
import { Element,scroller } from 'react-scroll';
import { useEffect } from 'react';

function Home(){
  useEffect(() => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          scroller.scrollTo(hash, {
            duration: 500,
            smooth: true,
          });
        }, 500);
      }
    },[]);

    return (
        <div className='App font-mono'>
        <div className='w-full bg-gradient-to-b from-amber-700 to-amber-200 dark:from-orange-900 
                        dark:via-orange-800 dark:to-orange-900 flex flex-col items-center dark:text-white'>
            <Featured/>
            <Element name='search' className='w-full fles items-center'>
                <MSearch className="sm:hidden m-auto"/>
                <Search/>
            </Element>
        </div>
        </div>
    )
}

export default Home