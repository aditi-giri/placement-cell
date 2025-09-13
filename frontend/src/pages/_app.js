import { store } from "../config/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App({ Component, pageProps }) {
  return(
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
   )
}
