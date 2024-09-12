import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './main/Main.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Route.jsx'
import { Provider } from 'react-redux'
import {store} from '../src/redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>

    <RouterProvider router={router}> 
     <Main></Main>
    </RouterProvider>
    </Provider>
  </React.StrictMode>,
)
