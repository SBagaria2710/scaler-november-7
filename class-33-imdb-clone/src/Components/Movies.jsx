import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import MovieCard from './MovieCard';
import { useSelector, useDispatch } from 'react-redux';
import paginationSlice from "../redux/paginationSlice";
import { MovieContext } from '../Context/MovieContext';

const actions = paginationSlice.actions;

function Movies() {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([
    { url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68", title: "Movie 1" },
    { url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68", title: "Movie 2" },
    { url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68", title: "Movie 3" },
    { url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68", title: "Movie 4" },
    { url: "https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68", title: "Movie 5" },
  ]);
  const pageNo = useSelector((store) => store.paginationState.page);
  const { watchlist, addToWatchlist, removeFromWatchlist, setWatchlist } = useContext(MovieContext);

  //handlers
  const handlePrev = () => {
    if (pageNo != 1) {
      dispatch(actions.prev())
    };
  }

  const handleNext = () => {
    dispatch(actions.next())
  }

  useEffect(() => {
    function fetchData() {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${pageNo}`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzQ5ZWU4NjkyN2M4NjJlNmFjNDAzNjBlM2ViOGMwZCIsIm5iZiI6MTY1NzgxODcwMy4yMDIsInN1YiI6IjYyZDA0ZTRmMzk0YTg3MDRhZTVjNWEzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._LNDpBJ--YTga2vupX46hCWhBnsgEW43JjSJ2hyTA6k",
        },
      };
      axios
        .request(options)
        .then((res) => {
          const movie = res.data?.results;
          setMovies(movie);
        })
        .catch((err) => console.error(err));
    }
    fetchData();
  }, [pageNo]);
  return (
    <div>
      {/* title */}
      <div className='text-2xl font-bold text-center m-5'>
        <h1>Trending Movies</h1>
      </div>

      {/* all movies */}
      <div className='flex justify-evenly flex-wrap gap-8'>
        {movies.map((movieObj) => {
          return (
            <div key={movieObj.id}>
              <MovieCard
                movieObj={movieObj}
                addToWatchlist={addToWatchlist}
                watchlist={watchlist}
                removeFromWatchlist={removeFromWatchlist}
              />
            </div>
          )
        })}
      </div>

      {/* pagination */}
      <div className='bg-gray-400 h-[50px] w-full mt-8 flex justify-center gap-3 p-4'>
        <div onClick={handlePrev}><i className="fa-solid fa-left-long"></i></div>
        <div>{pageNo}</div>
        <div onClick={handleNext}><i className="fa-solid fa-right-long"></i></div>
      </div>
    </div>
  )
}

export default Movies