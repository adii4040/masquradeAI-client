import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import PublicRoute from './routes/PublicRoutes'
import PrivateRoute from './routes/PrivateRoutes'
import {
  LoginPage,
  SignupPage,
  ChatPage,
  LandingPage
} from './pages'

import { AppLayout } from './layout'

function App() {
  return (
    <Routes>
      {/* Open Landing Page Route */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* Public-only Routes (Redirects to dashboard if logged in) */}
      <Route element={<PublicRoute />}>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/dashboard"
          element={<Navigate to="/chat/hitesh-chaudhary" replace />}
        />
        <Route
          path="/chat/:personaSlug"
          element={
            <AppLayout>
              <ChatPage />
            </AppLayout>
          }
        />
        {/* Fallback to default persona */}
        <Route
          path="*"
          element={<Navigate to="/chat/hitesh-chaudhary" replace />}
        />
      </Route>
    </Routes>
  )
}

export default App
