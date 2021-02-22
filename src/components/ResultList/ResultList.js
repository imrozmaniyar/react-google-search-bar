import React, { useContext } from 'react';
import DispatchContext from '../context/DispatchContext';
import StateContext from '../context/StateContext';
import { Link } from 'react-router-dom';

function ResultListComponent({ items }) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  let sortedItems = items.slice().sort(function(a, b) {
    let textA = a.Title.toUpperCase();
    let textB = b.Title.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  return (
    <>
      <div
        className={
          'dropdown ' +
          (appState.isSearchOpen ? 'dropdown-visible ' : '') +
          (appState.isSearchPage ? ' search-dropdown' : '')
        }
      >
        <ul>
          {sortedItems.map((elem, index) => (
            <Link
              className=""
              to={`/search-result/${elem.imdbID}`}
              key={index}
              onClick={() => {
                appDispatch({ type: 'searchString', value: elem.Title });
                appDispatch({ type: 'query', value: sortedItems });
                appDispatch({ type: 'isSearchPage', value: true });
                appDispatch({ type: 'closeSearch' });
              }}
            >
              <li>{elem.Title}</li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ResultListComponent;
