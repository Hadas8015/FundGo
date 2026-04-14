import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './Student_grants_Project/store';  // ייבוא ה-store שלך מ-Redux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* עוטפים את App ב-Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();


// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import {store} from './Student_grants_Project/store'; // נתיב לקובץ ה-store
// import Main from './Student_grants_Project/Main';
// import { BrowserRouter } from 'react-router-dom';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     {/* עטיפה ב-Redux Provider */}
//     <Provider store={store}> 
//       {/* עטיפה ב-BrowserRouter לניתובים */}
//       <BrowserRouter> 
//         <Main />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );