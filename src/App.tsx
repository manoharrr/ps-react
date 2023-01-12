import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NoMatchRoute from "./components/NoMatchRoute";
import RequireAuth from "./utils/requireAuth";
import SubHeader from "./components/SubHeader";
import LoadingSpinner from "./components/UI/LoadingSpinner";
const Home = lazy(() => import("./pages/Home"));
const SignUp = lazy(() => import("./pages/SignUp"));
const CreditCardPage = lazy(() => import("./pages/CreditCardPage"));

function App() {
  return (
    <>
      <MainHeader />
      <SubHeader />
      <main className='container max-w-full mx-auto md:py-4 px-10'>
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth>
                <Suspense fallback={<LoadingSpinner />}>
                  <Home />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route
            path='/creditcard'
            element={
              <RequireAuth>
                <Suspense fallback={<LoadingSpinner />}>
                  <CreditCardPage />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path='/signup'
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <SignUp />
              </Suspense>
            }
          />
          <Route
            path='profile'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          ></Route>
          <Route path='*' element={<NoMatchRoute />} />
        </Routes>
      </main>
      <MainFooter />
    </>
  );
}

export default App;
