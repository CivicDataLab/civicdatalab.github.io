import { useReducer, useEffect } from 'react';

const CORS_PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';

const intialState = {
  blogPosts: [],
  errorMessage: '',
  loading: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING_POSTS':
      return {
        blogPosts: [],
        errorMessage: '',
        loading: true
      };
    case 'FETCHING_POSTS_SUCCESS':
      return {
        blogPosts: action.payload,
        errorMessage: '',
        loading: false
      };
    case 'FETCHING_POSTS_FAILED':
      return {
        blogPosts: [],
        errorMessage: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

const useMediumFeed = (mediumUserName) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: 'FETCHING_POSTS' });
      await fetch(CORS_PROXY + `https://medium.com/feed/${mediumUserName}`)
        .then((res) => res.json())
        .then((response) => {
          dispatch({
            type: 'FETCHING_POSTS_SUCCESS',
            payload: response.items
          });
        })
        .catch((error) => {
          dispatch({ type: 'FETCHING_POSTS_FAILED', payload: error.message });
        });
    }
    fetchData();
  }, [mediumUserName]);

  return [state.blogPosts, state.error, state.loading];
};

export default useMediumFeed;
