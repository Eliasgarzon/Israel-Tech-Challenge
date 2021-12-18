import { Box } from "@mui/system";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./mui/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Signup from "./pages/signup/Signup";
import SearchResults from "./pages/searchResults/SearchResults";

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ textAlign: "center" }}>
        {authIsReady && (
          <BrowserRouter>
            {user && <Navbar />}
            <Routes>
              <Route
                path="/"
                element={(user && <Home />) || <Navigate to="/login" />}
              />
              <Route
                exact
                path="/profile"
                element={(user && <Profile />) || <Navigate to="/login" />}
              />
              <Route
                path="/signup"
                element={(!user && <Signup />) || <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={(!user && <Login />) || <Navigate to="/" />}
              />
              <Route
                path="/profile/:id"
                element={(user && <Profile />) || <Navigate to="/" />}
              />
              <Route
                path="/:searchFilter/:searchInput"
                element={(user && <SearchResults />) || <Navigate to="/" />}
              />
              <Route path="*" exact />
            </Routes>
          </BrowserRouter>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
