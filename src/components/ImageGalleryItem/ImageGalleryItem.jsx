import css from './ImageGalleryItem.module.css';
import { useEffect } from 'react';

const ImageGalleryItem = ({ src, alt, openModal, src2 }) => {

  useEffect(() => {
    const { height: cardHeight } = document.querySelector('ul').firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 3,
      behavior: 'smooth',
    });
  }, []);

  return (
    <li className={css.imageGalleryItem}>
      <img className={css.imageGalleryItemImage} src={src} alt={alt} id={src2} onClick={openModal} />
    </li>
  );
};

export default ImageGalleryItem;
