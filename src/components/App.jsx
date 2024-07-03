import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Notiflix from 'notiflix';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import css from './App.module.css';
import { fetchFunc } from '../services/api';

const App = () => {

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [dataStore, setDataStore] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  const addImages = async () => {
    setLoading(true);
    const data = await fetchFunc(search, page);
    if (data && data.hits.length > 0) {
      setDataStore(prevState => ([
        ...prevState, ...data.hits,
      ]));
      setLoading(false);
      setTotalPages(Math.ceil(data.totalHits / 12));
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialized) {
      addImages();
    } else {
      setIsInitialized(true);
    }
  }, [search, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (value) => {
    if (value.trim() === '') {
      Notiflix.Notify.warning('Please enter a search query.');
      return;
    }
    setSearch(value);
    setPage(1);
    setDataStore([]);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = evt => {
    const { id, alt } = evt.target;
    setIsModalOpen(true);
    setCurrentImg({ src: id, alt: alt });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSubmit} />
      {dataStore.length > 0 && (
        <ImageGallery data={dataStore} openModal={openModal} />
      )}
      {loading && <Loader />}
      {totalPages !== page && !loading && (
        <Button onClick={loadMore} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal} data={currentImg} />
      )}
    </div>
  );
};

export default App;
