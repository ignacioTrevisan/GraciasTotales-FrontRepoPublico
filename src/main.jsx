import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={Store}>
      <div className="background"> </div>

      <div className="content">

        <App />
      </div>

    </Provider>
  </BrowserRouter>,
  //</React.StrictMode>
)
