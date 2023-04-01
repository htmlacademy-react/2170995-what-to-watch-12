import FooterLogo from './logo/Footer-logo';

export default function Footer(): JSX.Element {
  return (
    <footer className='page-footer'>
      <FooterLogo />

      <div className='copyright'>
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}
