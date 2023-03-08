import MainPage from '../../pages/main-page/main-page';

type AppPageProps = {
  title: string;
  genre: string;
  year: number;
};

function App({ title, genre, year }: AppPageProps): JSX.Element {
  return <MainPage title={title} genre={genre} year={year} />;
}

export default App;
