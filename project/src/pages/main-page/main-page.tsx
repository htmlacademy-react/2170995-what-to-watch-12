import { store } from '../../store';
import { checkAuthAction, fetchFilmsAction } from '../../store/api-actions';

// components
import PromoFilm from '../../components/promo-film/promo-film';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';

store.dispatch(checkAuthAction());

export default function MainPage(): JSX.Element {
  store.dispatch(fetchFilmsAction());

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
