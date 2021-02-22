import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { fetchData } from '../../services/movies';
import DispatchContext from '../context/DispatchContext';
import StateContext from '../context/StateContext';
import { Link } from 'react-router-dom';
import ResultListComponent from '../ResultList';

import './SearchResult.scss';

function SearchResult() {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState({});
  const [dataList, setDataList] = useState([]);
  const [errorMssg, setErrorMssg] = useState('');
  const [pageList, setPageList] = useState([]);

  /**
   * This will be called every time there is
   * a change in the input
   * @param {*} { target: { defaultValue } }
   */
  const onChange = defaultValue => {
    setQuery(defaultValue.target.value);
    console.log(defaultValue.target);
    const search = _.debounce(sendQuery, 600);

    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    if (defaultValue.target.value) {
      search(defaultValue.target.value);
    } else {
      setDataList([]);
      setErrorMssg('');
    }
  };

  /**
   * In charge to send the value
   * to the API.
   * @param {*} defaultValue
   */
  const sendQuery = async defaultValue => {
    const { cancelPrevQuery, result } = await fetchData(defaultValue);

    if (cancelPrevQuery) return;

    if (result.Response === 'True') {
      setDataList(result.Search);
      appDispatch({ type: 'totalResults', value: result.totalResults });
      appDispatch({ type: 'openSearch' });
      appDispatch({ type: 'isSearchPage', value: true });
      setErrorMssg('');
    } else {
      setDataList([]);
      setErrorMssg(result.Error);
    }
  };

  return (
    <>
      <div id="header">
        <div id="topbar">
          <Link
            to="/"
            onClick={() => {
              appDispatch({ type: 'isSearchPage', value: false });
              appDispatch({ type: 'closeSearch' });
            }}
          >
            <img
              id="searchbarimage"
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            />
          </Link>
          <div
            id="searchbar"
            type="text"
            className={'bar ' + (appState.isSearchOpen ? 'bar-open' : '')}
          >
            <input
              id="searchbartext"
              type="text"
              autoComplete="off"
              className="searchbar"
              defaultValue={appState.searchString}
              onChange={onChange}
            />
            <a href="#">
              <img
                className="voice"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png"
              />
            </a>
            <div>
              <ResultListComponent items={dataList} />
              {errorMssg}
            </div>
          </div>

          <div id="boxesicon"></div>
          <div id="bellicon"></div>
        </div>
        <div id="optionsbar">
          <ul id="optionsmenu1">
            <li id="optionsmenuactive">All</li>
            <li>News</li>
            <li>Videos</li>
            <li>Images</li>
            <li>Maps</li>
            <li>More</li>
          </ul>

          <ul id="optionsmenu2">
            <li>Settings</li>
            <li>Tools</li>
          </ul>
        </div>
      </div>
      <div id="searchresultsarea">
        <p id="searchresultsnumber">About {appState.totalResults} results (0.56 seconds) </p>
        {appState.query.map((elem, index) => (
          <div className="searchresult" key={index}>
            <h2>{elem.Title}</h2>
            <a>{elem.Poster}</a> <button>▼</button>
            <p>
              Year: {elem.Year} -- Type: {elem.Type}
            </p>
          </div>
        ))}

        <div className="relatedsearches">
          <h3>Searches related to computer engineering mutex concept</h3>
          <div className="relatedlists">
            <ul className="relatedleft">
              <li>
                Lorem <b>ipsum</b> and Lorem Ipsum
              </li>
              <li>
                <b>Lorem</b> lock c++
              </li>
              <li>
                <b>Lorem</b> java
              </li>
              <li>
                <b>Lorem</b> c++
              </li>
            </ul>
            <ul className="relatedright">
              <li>
                <b>Lorem</b> ipsum
              </li>
              <li>
                <b>Lorem</b> ipsum ipsum
              </li>
              <li>
                <b>Lorem</b> ipsum ipsum ipsum ipsum{' '}
              </li>
              <li>
                <b>Lorem</b> ipsum
              </li>
            </ul>
          </div>
        </div>

        <div className="pagebar">
          <ul className="pagelist">
            <li className="pagelistprevious">Previous</li>
            <li className="pagelistfirst">1</li>
            <li className="pagelistnext">Next</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default withRouter(SearchResult);
