// _app.js
import '../styles/globals.css';
import { AuthProvider } from '../AuthContext'; // Update the path based on the location of your AuthContext.js file

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
