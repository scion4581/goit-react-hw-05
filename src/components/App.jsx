import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

import './App.module.css'
import Layout from "./Layout/Layout";

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const ErrorPage = lazy(() => import('../pages/ErrorPage/ErrorPage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage/MoviesPage'));
const MovieInfoPage = lazy(() => import('../pages/MovieInfoPage/MovieInfoPage'));
const MovieCast = lazy(() => import('../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../components/MovieReviews/MovieReviews'));

export default function App() {

  return (
    <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieInfoPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<ErrorPage message='Page not found'/>} />
          </Routes>
    </Layout>
  );
}
