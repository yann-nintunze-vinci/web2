import { useState } from 'react'
import sound from './assets/sounds/01_All_Day.mp3'
import logo from "./assets/images/js-logo.png";
import pizzaBackground from "./assets/images/pizza.jpg";
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <header>
        <h1 className="animate__animated animate__bounce">We love Pizza</h1>
      </header>

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

      <footer>
        <h1 className="animate__animated animate__bounce animate__delay-2s">
          But we also love JS
        </h1>
        <img src={logo} alt="" />
      </footer>
    </>
  )
}

export default App
