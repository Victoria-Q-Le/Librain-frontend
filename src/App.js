import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import {Container} from 'react-bootstrap'

function App() {
  return (
    <div>
      <Header />
      <main className = 'py-3'>
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
