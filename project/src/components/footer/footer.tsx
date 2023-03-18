import LogoLight from '../logo/logo-light';

function Footer(): JSX.Element {
  return (
    <footer className='page-footer'>
      <div className='logo'>
        <LogoLight />
      </div>

      <div className='copyright'>
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
