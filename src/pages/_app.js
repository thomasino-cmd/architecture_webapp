import '../styles/globals.css';
import CustomCursor from '../components/CustomCursor';
import ProgressBar from '../components/ProgressBar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Progress bar indicating scroll depth */}
      <ProgressBar />
      {/* Custom cursor follows the mouse */}
      <CustomCursor />
      {/* Render the page component */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
