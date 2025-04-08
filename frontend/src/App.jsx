import { Outlet } from 'react-router-dom'
import { Navbar } from './components'
import { Footer } from './components'
import { useDispatch } from 'react-redux'
import { login } from './store/auth.slice'
import userServices from './services/user.services'
import { use, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from './store/user.slice'

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    ;(
      async() => {
        try {
          const response = await userServices.getSelf();
          if (response) {
            dispatch(setUser(response.user))
            dispatch(login())
            navigate('/home');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    )();
  }, []);
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

export default App;