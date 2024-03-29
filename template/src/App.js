import './App.css';
import { useState } from 'react';
import { useWalletInit } from './instantiateRadixDappToolkit'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AppStateProvider } from "./appState";
import {HomePage} from './pages/HomePage';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const componentAddressGlobal = process.env.REACT_APP_COMPONENT_ADDRESS
const ownerBadgeAddressGlobal = process.env.REACT_APP_OWNER_BADGE_ADDRESS
const adminResourceAddressGlobal = process.env.REACT_APP_ADMIN_RESOURCE_ADDRESS_GLOBAL

function App() {
    const [appState, setAppState] = useState({
        componentAddress: componentAddressGlobal,
        ownerBadgeAddress: ownerBadgeAddressGlobal,
        adminResourceAddress: adminResourceAddressGlobal,
    })
    useWalletInit(setAppState)

    return (
        <AppStateProvider value={[appState, setAppState]}>
            <div className="App">
                <Router>
                    <div className="pageContainer">
                        <Routes>
                            <Route path="" element={<HomePage />} />
                        </Routes>
                    </div>
                </Router>



            </div>
        </AppStateProvider>
    );
}

export default App;
