import './App.css';
import { useFetch } from './useFetch';
import { useState } from 'react';
const url = 'https://jsonplaceholder.typicode.com/posts';
function App() {
  const [val, setVal] = useState(0);
  const { posts, isLoading, error, refetch, allPosts, newFetch } =
    useFetch(url);

  console.log('render App');
  const style = {
    width: '250px',
  };
  return (
    <>
      <div>
        <input
          onChange={(e) => setVal(e.target.value)}
          style={style}
          type="number"
          step="1"
          min="1"
          max="100"
          placeholder="сколько вывести потсов ? max 100"></input>
        <button
          onClick={() =>
            refetch({
              params: {
                _limit: val,
              },
            })
          }>
          refetch
        </button>
        <button onClick={() => allPosts()}>allPosts</button>
        <button onClick={() => newFetch()}>новый запрос на сервер</button>
      </div>
      {isLoading && 'Загрузка...'}
      {error && 'произошла ошибка'}
      {posts &&
        !isLoading &&
        posts.map((item) => (
          <div key={item.id}>
            {item.id} {item.title}
          </div>
        ))}
    </>
  );
}

export default App;
