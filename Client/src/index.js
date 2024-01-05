// Import necessary dependencies from React and ReactDOM libraries
import React from 'react'
import ReactDOM from 'react-dom'

// Import BrowserRouter component from react-router-dom library
import { BrowserRouter } from 'react-router-dom'

// Import Provider component from react-redux library
import { Provider } from 'react-redux'

// Import serviceWorker module from './serviceWorker' file
import * as serviceWorker from './serviceWorker'

// Import CSS styles from './index.css' file
import './index.css'

// Import App component from './App' file
import App from './App'

// Import store and persistor objects from './store.js' file
import { store, persistor } from './store.js'

// Import PersistGate component from redux-persist/integration/react library
import { PersistGate } from 'redux-persist/integration/react'

// Register the service worker
serviceWorker.register()

// Render the React application
ReactDOM.render(
  // Wrap the entire application with Provider component to provide the Redux store
  <Provider store={store}>
    {/* Wrap the application with PersistGate component to persist the Redux store */}
    <PersistGate loading={null} persistor={persistor}>
      {/* Wrap the application with BrowserRouter component to enable routing */}
      <BrowserRouter>
        {/* Render the App component */}
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  // Mount the application to the 'root' element in the HTML document
  document.getElementById('root')
)
