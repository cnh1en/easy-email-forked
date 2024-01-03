import Page from '@demo/components/Page';
import Home from '@demo/pages/Home';
import store from '@demo/store';
import '@demo/styles/common.scss';
import '@shopify/polaris/build/esm/styles.css';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './utils/history';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';

const Editor = React.lazy(() => import('@demo/pages/Editor'));

function App() {
  return (
    <AppProvider i18n={translations}>
      <Provider store={store}>
        <Page>
          <Suspense
            fallback={
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  width='200px'
                  src='/loading'
                  alt=''
                />
                <p
                  style={{
                    fontSize: 24,
                    color: 'rgba(0, 0, 0, 0.65)',
                  }}
                >
                  Please wait a moment.
                </p>
              </div>
            }
          >
            <Router history={history}>
              <Switch>
                <Route
                  path='/'
                  exact
                  component={Home}
                />
                <Route
                  path='/editor'
                  component={Editor}
                />
              </Switch>
            </Router>
          </Suspense>
        </Page>
      </Provider>
    </AppProvider>
  );
}

export default App;
