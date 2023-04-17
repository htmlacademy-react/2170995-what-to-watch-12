import './loading.css';

export default function Loading(): JSX.Element {
  return (
    <div className='loader-body'>
      <div className='loader'>
        <span className='loader-span'>L</span>
        <span className='loader-span'>O</span>
        <span className='loader-span'>A</span>
        <span className='loader-span'>D</span>
        <span className='loader-span'>I</span>
        <span className='loader-span'>N</span>
        <span className='loader-span'>G</span>

        <div className='covers'>
          <span className='loader-span'></span>
          <span className='loader-span'></span>
          <span className='loader-span'></span>
          <span className='loader-span'></span>
          <span className='loader-span'></span>
          <span className='loader-span'></span>
          <span className='loader-span'></span>
        </div>
      </div>
    </div>
  );
}
