import MovieList from '../screens/MovieList';
import Configuration from '../screens/Configuration';
import MovieDetails from '../screens/MovieDetails';
import Search from '../screens/Search';
import MovieVideo from '../screens/MovieVideo';

import { ROUTES } from './routes';

export const MoviesScreen = {
  [ROUTES.MOVIE_LIST]: {
    screen: MovieList,
    navigationOptions: {
      title: 'Início'
    }
  },
  [ROUTES.MOVIE_DETAILS]: {
    screen: MovieDetails
  },
  [ROUTES.MOVIE_VIDEO]: {
    screen: MovieVideo
  }
};

export const SearchScreen = {
  [ROUTES.SEARCH]: {
    screen: Search,
    navigationOptions: {
      title: 'Buscar'
    }
  },
  [ROUTES.SEARCH_RESULTS]: {
    screen: MovieList
  },
  [ROUTES.MOVIE_DETAILS]: {
    screen: MovieDetails
  },
  [ROUTES.MOVIE_VIDEO]: {
    screen: MovieVideo
  }
};

export const ConfigurationScreen = {
  [ROUTES.CONFIGURATION]: {
    screen: Configuration,
    navigationOptions: {
      title: 'Mais'
    }
  }
};
