import React, { useState, useContext } from 'react';
import DispatchContext from '../context/DispatchContext';
import StateContext from '../context/StateContext';
import _ from 'lodash';
import { fetchData } from '../../services/movies';
import ResultListComponent from '../ResultList';

import style from './index.scss';

const SearchBarComponent = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState({});
  const [dataList, setDataList] = useState([]);
  const [errorMssg, setErrorMssg] = useState('');

  /**
   * This will be called every time there is
   * a change in the input
   * @param {*} { target: { value } }
   */
  const onChange = ({ target: { value } }) => {
    setQuery(value);

    const search = _.debounce(sendQuery, 600);

    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    if (value) {
      search(value);
    } else {
      setDataList([]);
      setErrorMssg('');
    }
  };

  /**
   * In charge to send the value
   * to the API.
   * @param {*} value
   */
  const sendQuery = async value => {
    const { cancelPrevQuery, result } = await fetchData(value);

    if (cancelPrevQuery) return;

    if (result.Response === 'True') {
      setDataList(result.Search);
      appDispatch({ type: 'totalResults', value: result.totalResults });
      appDispatch({ type: 'openSearch' });
      setErrorMssg('');
    } else {
      setDataList([]);
      setErrorMssg(result.Error);
    }
  };

  return (
    <>
      <div className="logo">
        <img
          alt="Google"
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        />
      </div>
      <div className={'bar ' + (appState.isSearchOpen ? 'bar-open' : '')}>
        <input
          className="searchbar"
          type="text"
          value={query}
          autoComplete="off"
          placeholder="Enter Movie Title"
          onChange={onChange}
        />
        <a href="#">
          <img
            alt="Google Mic"
            className="voice"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png"
          />
        </a>
      </div>
      <div className="buttons">
        <button className="button"> Google Search </button>
        <button className="button"> I'm Feeling Lucky </button>
      </div>
      <div>
        <ResultListComponent items={dataList} />
        {errorMssg}
      </div>
    </>
  );
};

export default SearchBarComponent;
