import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SolarActiveTable from '../pages/SolarActiveTable'
import MainPage from '../pages/MainPage'
import SolarMap from '../pages/SolarMap'
import AboutPage from '../pages/AboutPage'
import Satellites from '../pages/Satellites'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solarTable" element={<SolarActiveTable />} />
        <Route path="/solarMap" element={<SolarMap />} />
        <Route path="/satellites" element={<Satellites />} />
    </Routes>
  )
}

export default MainRoutes