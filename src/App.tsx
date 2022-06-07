import React from 'react';

import {Provider} from "react-redux";
import store from "./store";
import Weather from "./components/Weather";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

function App() {

    let persistor = persistStore(store);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Weather/>
            </PersistGate>
        </Provider>
    );
};

export default App;
