import React, { 
  useRef, 
  useState, 
  useEffect, 
  useCallback 
} from 'react';
import PokeCard from '../../components/PokeCard';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonList } from '../../actions/pokemonActions';

function Home() {
  const observer = useRef();
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.pokemons.isFetching);
  const pokemons = useSelector(state => state.pokemons.data);
  const currentPage = useSelector(state => state.pokemons.currentPage);
  const totalPages = useSelector(state => state.pokemons.totalPages);
  const [loadingMore, setLoadingMore] = useState(false);

  const lastPokemonRef = useCallback(
    node => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          setLoadingMore(true);
          dispatch(getPokemonList(currentPage + 1));
        } else {
          setLoadingMore(false);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, currentPage, totalPages, dispatch]
  );
  
  useEffect(() => {
    dispatch(getPokemonList());
  }, [dispatch]);

  return (
    <div>
     <PokeCard 
        pokemons={pokemons}
        isFetching={isFetching}
        loadingMore={loadingMore}
        lastPokemonRef={lastPokemonRef}
     />
    </div>
  );
}

export default Home;
