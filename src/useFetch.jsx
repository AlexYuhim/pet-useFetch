import { useEffect, useState, useMemo } from 'react';

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getApiPosts = async () => {
    console.log('запрос данных с сервера');

    const response = await fetch(url);

    if (response.ok) {
      const allPosts = await response.json();
      setData(allPosts);
    } else {
      setError(true);
    }
    setIsLoading(false);
  };

  const postsMemo = useMemo(() => data, [data]);
  useEffect(() => {
    setPosts(data);
  }, [data]);

  const allPosts = () => {
    setPosts(data);
  };
  const newFetch = () => {
    getApiPosts();
  };

  const refetch = ({ params }) => {
    const copyPosts = [...postsMemo];
    const slicePosts = copyPosts.slice(0, params._limit);
    setPosts(slicePosts);
  };

  useEffect(() => {
    try {
      getApiPosts();
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  }, []);

  return { posts, isLoading, error, refetch, allPosts, newFetch };
}
