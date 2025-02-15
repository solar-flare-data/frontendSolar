import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SolarActiveTable from '../pages/SolarActiveTable'
import MainPage from '../pages/MainPage'
import SolarMap from '../pages/SolarMap'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/solarTable" element={<SolarActiveTable />} />
        <Route path="/solarMap" element={<SolarMap />} />
    </Routes>
  )
}

export default MainRoutes