import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Col, Card } from 'react-bootstrap';

const PokeCard = ({ isFetching, pokemons, loadingMore, lastPokemonRef }) => {
  return (
    <div className="pokemon-container">
      {isFetching && pokemons.length === 0 ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="card-container">
          {!isFetching && pokemons.length === 0 ? (
            <p>No Pokémon Found.</p>
          ) : (
            pokemons.map((pokemon, index) => {
              const isLastPokemon = pokemons.length === index + 1;
              const key = `${pokemon.id}-${index}`;
              const pokemonImage = pokemon?.picture
              return (
                <Link key={key} to={`/pokemon/${pokemon.name}`} className="card-link">
                  <Col xs={12} sm={6} lg={3}>
                    <Card ref={isLastPokemon ? lastPokemonRef : null} className="card">
                      <h2 className="pokemon-title">{pokemon.name}</h2>
                      <figure className="p-4 m-0">
                        <Card.Img variant="top" className="card-img" src={pokemonImage} alt={pokemon.name} />
                      </figure>
                      <Card.Body className="card-body">
                        <Button className="card-button" variant="undifined">View</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Link>
              );
            })
          )}
        </div>
      )}
      {loadingMore && <p className="loading">Loading more...</p>}
    </div>
  );
}

export default PokeCard;
