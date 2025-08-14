import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './src/App'
import appStore from './src/store/appStore'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </StrictMode>,
)
