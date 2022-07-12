import { Logger } from '@turboutils/logger';
import { Movie } from '../../models';
import { Button } from '../Button';

interface MovieListProps {
  movies: Array<Movie>;
}

export function MovieList({ movies }: MovieListProps) {
  const handleClick = (movieName: string) => {
    Logger.info({
      type: 'UiElementEvent',
      event: 'click',
      container: 'MovieList',
      elementType: 'button',
      elementId: 'watch',
      elementValue: movieName,
    });
  };

  return (
    <table data-testid="movie-table">
      <thead>
        <tr>
          <th className="text-center">Rank</th>
          <th>Name</th>
          <th className="text-center">Year</th>
          <th className="text-center">Rating</th>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => (
          <tr key={movie.name}>
            <td className="text-center">{index + 1}</td>
            <td>{movie.name}</td>
            <td className="text-center">{movie.year}</td>
            <td className="text-center">{movie.rating.toFixed(1)}</td>
            <td className="flex justify-center">
              <Button onClick={() => handleClick(movie.name)}>Watch</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
