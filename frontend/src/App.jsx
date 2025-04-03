import { Outlet } from 'react-router-dom'
import { Navbar } from './components'
import { Footer } from './components'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App