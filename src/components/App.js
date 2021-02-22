import React from 'react';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import StateContext from './context/StateContext';
import DispatchContext from './context/DispatchContext';

import style from './App.scss';
import SearchBar from './SearchBar';
import Header from './Header';
import SearchResult from './SearchResult/SearchResult';
import Footer from './Footer/Footer';

function App() {
  const initialState = {
    isSearchOpen: false,
    query: [],
    searchString: '',
    totalResults: 0,
    isSearchPage: false
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case 'query':
        draft.query = action.value;
        return;
      case 'searchString':
        draft.searchString = action.value;
        return;
      case 'totalResults':
        draft.totalResults = action.value;
        return;
      case 'isSearchPage':
        draft.isSearchPage = action.value;
        return;
      case 'openSearch':
        draft.isSearchOpen = true;
        return;
      case 'closeSearch':
        draft.isSearchOpen = false;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <div className={style.App}>
            <Switch>
              <Route path="/" exact>
                <Header />
                <SearchBar />
              </Route>
              <Route path="/search-result">
                <SearchResult />
              </Route>
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
