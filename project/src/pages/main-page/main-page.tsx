import { store } from '../../store';
import {
  checkAuthAction,
  fetchFilmsAction,
  promoFilmAction,
} from '../../store/api-actions';

// components
import PromoFilm from '../../components/promo-film/promo-film';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';

store.dispatch(checkAuthAction());

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFilmsAction());
    dispatch(promoFilmAction());
  }, [dispatch]);

  return (
    <>
      <PromoFilm />
      <div className='page-content'>
        <Catalog />
        <Footer />
      </div>
    </>
  );
}
