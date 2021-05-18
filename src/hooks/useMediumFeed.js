import { useReducer, useEffect } from 'react';
import Parser from 'rss-parser';

const parser = new Parser();
const CORS_PROXY = 'https://cors0any.herokuapp.com/';

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
    dispatch({ type: 'FETCHING_POSTS' });
    parser
      .parseURL(CORS_PROXY + `https://medium.com/feed/@${mediumUserName}`)
      .then((response) => {
        dispatch({
          type: 'FETCHING_POSTS_SUCCESS',
          payload: response.items.filter((post) => post['content:encoded'].indexOf('CivicDataLab') > -1).slice(0, 4)
        });
      })
      .catch((error) => {
        dispatch({ type: 'FETCHING_POSTS_FAILED', payload: error.message });
      });
  }, [mediumUserName]);

  return [state.blogPosts, state.error, state.loading];
};

export default useMediumFeed;
