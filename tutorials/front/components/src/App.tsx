//import { useState } from 'react'
import sound from './assets/sounds/01_All_Day.mp3'
import logo from "./assets/images/js-logo.png";
import './App.css'

function App() {
  //const [count, setCount] = useState(0)
  return (
    <div className='page'>
      <Header title='We love Pizza' version={0+1}/>
      <Main />
      <Footer />
    </div>
  );
}

const Header = (props : HeaderProps) => {
  return (
    <header>
      <h1 className="animate__animated animate__bounce">{props.title}</h1>
      <h4>Version: {props.version}</h4>
    </header>
  );
};

const Main = () => {
  return (
    <main>
      <p>My HomePage</p>
      <p>
        Because we love JS, you can also click on the header to stop / start the
        music ; )
      </p>

      <audio id="audioPlayer" controls autoPlay>
        <source
          src={sound}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
    </main>
  );
};

const Footer = () => {
  return (
    <footer>
      <h1 className="animate__animated animate__bounce animate__delay-2s">
        But we also love JS
      </h1>
      <img src={logo} alt="" />
    </footer>
  );
};

interface HeaderProps {
  title: string;
  version: number;
}

export default App;
