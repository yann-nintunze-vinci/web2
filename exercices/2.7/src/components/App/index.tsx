import './App.css';
import Header from '../Header';
import Footer from '../Footer';
import Main from '../Main';

function App() {
  const title = "Mes films préférés";
  return (
    <div>
      <Header title={title}/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
