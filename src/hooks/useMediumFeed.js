import { useState, useEffect } from 'react';
import Parser from 'rss-parser';

const parser = new Parser();
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const useMediumFeed = (mediumUserName) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    parser
      .parseURL(CORS_PROXY + `https://medium.com/feed/@${mediumUserName}`)
      .then((response) => {
        console.log(response.items);
        setBlogPosts(response.items);
      })
      .catch((error) => console.log(error));
  }, []);

  return [blogPosts];
};

export default useMediumFeed;
