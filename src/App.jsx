import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import SignUp from './pages/SignUp';
import './styles/App.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Layout>
                        <Switch>
                            <PrivateRoute exact path="/result/:id" component={Result} />
                            <PrivateRoute exact path="/quiz/:id" component={Quiz} />
                            <PublicRoute exact path="/signup" component={SignUp} />
                            <PublicRoute exact path="/login" component={LogIn} />
                            <Route exact path="/" component={Home} />
                        </Switch>
                    </Layout>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App;
