import React, { useState, useEffect } from 'react';
import Pagination from '../components/UI/pagination/Pagination';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { usePosts } from '../hooks/usePosts';
import { getPageCount } from '../utils/pages';
import PostService from '../API/PostService';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import PostList from '../components/PostList';
import { Outlet } from 'react-router-dom';
import { useRef } from 'react';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';


const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);

    const totalCount = response.headers['x-total-count'];

    setTotalPages(getPageCount(totalCount, limit));
    setPosts([...posts, ...response.data]);
  })

  const lastElement = useRef();
  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts([...posts].filter(p => p.id !== post.id));
  }

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="App">
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <MyButton style={{ marginTop: '15px' }} onClick={() => setModal(true)}>Создать заметку</MyButton>

      <hr style={{ margin: '15px 0' }} />

      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={event => setLimit(event.target.value)}
        defaultValue='Кол-во выводимых элементов'
        options={[
          { value: 5, name: '5' },
          { value: 10, name: '10' },
          { value: 25, name: '25' },
          { value: -1, name: 'Все элементы' }
        ]} />

      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }

      <PostList posts={sortedAndSearchedPosts} title="Список постов языков" remove={removePost} />
      <div ref={lastElement} style={{ height: '30px', background: 'rgba(0,0,0,0)' }} />

      {isPostsLoading &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}><Loader /></div>
      }

      <Pagination
        totalPages={totalPages}
        page={page}
        changePage={changePage}
      />
    </div>
  );
}

export default Posts;