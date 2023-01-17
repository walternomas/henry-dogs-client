import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/Landing';
import Dogs from './components/Dogs';
import DogDetails from './components/DogDetails';
import Form from './components/Form';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route path="/dogs/add" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}
