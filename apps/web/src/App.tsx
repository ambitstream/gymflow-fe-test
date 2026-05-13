import { useState } from 'react'
import { AnimatePresence } from "motion/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import UsersPage from "./pages/UsersListPage";
import UserFormPage from "./pages/UserFormPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppSplashPage from "./pages/AppSplashPage";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:userId" element={<UserFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <AnimatePresence>
        {showSplash && (
          <AppSplashPage onFinish={() => setShowSplash(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
