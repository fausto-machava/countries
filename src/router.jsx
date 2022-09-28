import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CountryDesc from './pages/CountryDesc';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="country/:code" element={<CountryDesc />} />
        </Routes>
    )
}