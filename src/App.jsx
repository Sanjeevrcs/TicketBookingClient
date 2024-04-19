import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import routes from "./configs/routes"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

function App() {

  return (
    <>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      </LocalizationProvider>
    </>
  )
}

export default App
