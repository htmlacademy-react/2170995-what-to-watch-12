import { Link } from 'react-router-dom';

export default function FooterLogo(): JSX.Element {
  return (
    <div className='logo'>
      <Link
        to='/'
        className='logo__link logo__link--light'
        data-testid='footer-logo'
      >
        <span className='logo__letter logo__letter--1'>W</span>
        <span className='logo__letter logo__letter--2'>T</span>
        <span className='logo__letter logo__letter--3'>W</span>
      </Link>
    </div>
  );
}
