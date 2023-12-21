import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

// Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css';

// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MantineProvider>
            <Suspense>
                <Provider store={store}>
                    <RouterProvider router={router} />
                </Provider>
            </Suspense>
        </MantineProvider>
    </React.StrictMode>
);
