// creiamo ora la parte inferiore della pagina, la card che mostra i dettagli del film selezionato dal dropdown
// MovieCard riceverà sempre il valore selezionato dal dropdown grazie alla prop che gli verrà passata da App
// la prop si chiama "movieTitle"

import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import Placeholder from 'react-bootstrap/Placeholder'

// con "movieTitle" questo componente MovieCard dovrà interrogare le API di OMDB in modo da trovare le informazioni
// con cui riempire la card
// questo comporta che MovieCard dovrà essere un componente a CLASSE, perchè dovrà memorizzare quanto riceve
// da OMDBApi in un oggetto state

const MovieCard = ({ movieTitle }) => {
  // MovieCard riceve da App il titolo del film che abbiamo selezionato tramite una prop "movieTitle"
  // ora uso "movieTitle" per fare una fetch a OMDBApi

  // state = {
  //   movieObject: null,
  //   isLoading: true,
  // }

  const [movieObject, setMovieObject] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // componentDidMount() {
  //   // componentDidMount è un metodo di lifecycle integrato nei componenti a classe
  //   // viene lanciato UNA VOLTA SOLA dopo il primo render(), in modo da mostrare l'interfaccia
  //   // statica e poi recuperare i dati relativi al caricamento iniziale
  //   this.fetchMovieData()
  // }

  useEffect(() => {
    fetchMovieData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieTitle])

  // ora il fetchMovieData() avviene solo al caricamento del componente, una volta sola!
  // ma nel progetto originale, fetchMovieData() veniva richiamata ANCHE quando cambiava la prop movieTitle
  // lo facevamo con un componentDidUpdate che verificava if (prevProps.movieTitle !== this.props.movieTitle)

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.movieTitle !== this.props.movieTitle) {
  //     this.fetchMovieData()
  //   }
  // }

  // al montaggio del componente, lo stato iniziale della tendina è "Iron Man", che viene correttamente
  // passato anche a MovieCard tramite prop e quindi l'invocazione di fetchMovieData() dentro il componentDidMount
  // utilizza "Iron Man" come stringa di ricerca, i dati vengono recuperati e mostrati all'utente.
  // ...ma cambiando il valore della tendina, nonostante MovieCard riceva il valore aggiornato della prop!
  // quindi avremmo anche il valore aggiornato in this.props.movieTitle, ma il problema è che non ri-eseguiamo la fetch
  // è possibile utilizzare un metodo di lifecycle che si chiama "componentDidUpdate", che viene lanciato
  // IN AUTOMATICO dal componente a classe OGNI VOLTA che il componente riceve un "aggiornamento" --> ovvero
  // ogni volta che il componente rileva un cambiamento NELLE PROPS o NELLO STATE.

  const fetchMovieData = () => {
    // this.setState({
    //   isLoading: true,
    // })

    setIsLoading(true)

    fetch('http://www.omdbapi.com/?apikey=82c3f3e8&s=' + movieTitle)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('errore nel recupero dati')
        }
      })
      .then((data) => {
        // questo è un oggetto con i risultati
        // dentro troverò i risultati nella proprietà Search
        console.log(data.Search[0])
        // this.setState({
        //   movieObject: data.Search[0],
        //   isLoading: false,
        // })

        setMovieObject(data.Search[0])
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        // this.setState({
        //   isLoading: false,
        // })
        setIsLoading(false)
      })
  }

  // this.fetchMovieData()
  // NON POSSIAMO PURTROPPO METTERE this.fetchMovieData() dentro render()!
  // 100% provocherebbe un ciclo infinito (perchè dentro fetchMovieData() c'è un setState che re-invocherà render())

  return (
    // <>
    //   {this.state.isLoading ? (
    //     <div className="text-center">
    //       <Spinner animation="border" variant="warning" />
    //     </div>
    //   ) : (
    //     <Card>
    //       <Card.Img variant="top" src={this.state.movieObject.Poster} />
    //       <Card.Body>
    //         <Card.Title>{this.state.movieObject.Title}</Card.Title>
    //         <Card.Text>
    //           {this.state.movieObject.Type} - {this.state.movieObject.Year}
    //         </Card.Text>
    //         {/* <Button variant="primary">Go somewhere</Button> */}
    //       </Card.Body>
    //     </Card>
    //   )}
    // </>

    <Card>
      {isLoading ? (
        <div
          id="spinner-container"
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <Card.Img variant="top" src={movieObject.Poster} />
      )}
      <Card.Body>
        <Card.Title>
          {isLoading ? (
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
          ) : (
            movieObject.Title
          )}
        </Card.Title>
        {isLoading ? (
          <Placeholder as={Card.Body} animation="glow">
            <Placeholder xs={12} />
          </Placeholder>
        ) : (
          <Card.Text>
            <span>
              {movieObject.Type} - {movieObject.Year}
            </span>
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  )
}

export default MovieCard
