import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavbar from './components/CustomNavbar'
import { Component, useState } from 'react'
import MovieSelect from './components/MovieSelect'
import MovieCard from './components/MovieCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const App = () => {
  // state = {
  //   movieTitle: 'Iron Man',
  // }

  const [movieTitle, setMovieTitle] = useState('Iron Man')

  const changeMovieTitle = (newTitle) => {
    setMovieTitle(newTitle)
  }

  return (
    <div className="App">
      <header>
        <CustomNavbar />
      </header>
      <main>
        <Container className="my-5">
          <Row className="justify-content-center">
            <Col xs={12} md={6}>
              <MovieSelect
                movieTitle={movieTitle}
                changeMovieTitle={changeMovieTitle}
              />
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={6}>
              <MovieCard movieTitle={movieTitle} />
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  )
}

export default App
