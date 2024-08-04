import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  getPokemonDetail,
  catchPokemon,
  renamePokemon
} from '../../actions/pokemonActions';
import { 
  Row, 
  Col, 
  Card, 
  Container, 
  Button,
  Modal
} from 'react-bootstrap';


function Details() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const error = useSelector(state => state.pokemons.error);
  const pokemon = useSelector(state => state.pokemons.details);
  const isFetching = useSelector(state => state.pokemons.isFetching);
  const isSubmiting = useSelector(state => state.pokemons.isSubmiting);
  const [isCatching, setIsCatching] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  useEffect(() => {
    dispatch(getPokemonDetail(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    const isActionInProgress = isCatching || isRenaming;
    if (error && !isSubmiting && isActionInProgress) {
      setShowFailureModal(true);
    } else if (pokemon && !isSubmiting && isActionInProgress) {
      setShowSuccessModal(true);
    }

  }, [isSubmiting, error, pokemon, isRenaming, isCatching])


  const handleCatch = async () => {
    setIsRenaming(false)
    setIsCatching(true);
    await dispatch(catchPokemon(pokemon.id));
  };

  const handleRename = async() => {
    setIsCatching(false)
    setIsRenaming(true)
    await dispatch(renamePokemon(pokemon.id));
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseFailureModal = () => setShowFailureModal(false);

  if (isFetching) {
    return <Container className="py-5"><p>Loading...</p></Container>;
  }

  if (!pokemon) {
    return <Container className="py-5"><p>No Pokémon data available.</p></Container>;
  }

  return (
    <Container className="py-5">

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Pokemon has been successfully {isCatching ? 'caught' : 'renamed'}!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Failure Modal */}
      <Modal show={showFailureModal} onHide={handleCloseFailureModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:"red"}}>Failed to {isCatching ? 'catch' : 'rename'} the Pokémon. Please try again.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFailureModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Row>
        <Col xs={12} md={4} lg={4} className="mb-4">
          <Card className="shadow-lg mx-auto">
            <Card.Body>
              <Card.Title className="text-center text-2xl font-bold mb-4">{pokemon.name}</Card.Title>
              <div className="flex justify-center mb-4">
                <img 
                  src={pokemon.picture} 
                  alt={pokemon.name} 
                  className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300"
                />
              </div>
              <Card.Text className="mb-4 text-center">
                <strong>Types:</strong> {pokemon.types.join(', ')}
              </Card.Text>
              <div style={{display:'flex', justifyContent:'center', gap: '1rem'}}>
                <div>
                  <Button 
                    className="card-button"
                    variant="undifined" 
                    onClick={handleCatch}
                    disabled={isSubmiting}
                  >
                    {isSubmiting ? 'Catching...' : 'Catch'}
                  </Button>
                </div>
                <div>
                  <Button 
                    className="card-button"
                    variant="undifined" 
                    onClick={handleRename}
                    disabled={!pokemon.caught}
                  >
                    {isSubmiting ? 'Renaming...' : 'Rename'}
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8} lg={8}>
          <div style={{border: "1px solid", borderRadius: "5px"}} className="p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-lg">{pokemon.description || 'No description available.'}</p>
            <div className="text-sm text-gray-600">
              <p className="mb-1"><strong>Created At:</strong> {new Date(pokemon.created_at).toLocaleDateString()}</p>
              <p className="m-0 p-0"><strong>Updated At:</strong> {new Date(pokemon.updated_at).toLocaleDateString()}</p>
            </div>

          </div>
        </Col>
      </Row>
  </Container>
  );
}

export default Details;
