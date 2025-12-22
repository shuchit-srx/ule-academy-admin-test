import { BrowserRouter } from 'react-router-dom';
import Providers from './Providers';
import AppRouter from './AppRouter';

export default function App() {
    return (
        <BrowserRouter>
            <Providers>
                <AppRouter />
            </Providers>
        </BrowserRouter>
    );
}
