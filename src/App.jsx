import './App.css'
import ProductList from './components/ProductList/ProductList'
import { ContextProvider } from './components/Context';


function App() {
  return (
    <ContextProvider>
      <ProductList />
    </ContextProvider>
  )
}

export default App
