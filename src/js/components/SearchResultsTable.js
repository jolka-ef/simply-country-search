import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import '../../css/components/SearchResultsTable.css';
import '../../css/components/Button.css'


function Button() {
    const element = (
        <button >Toggle</button>
    )
    return element
}

function alphabetize(stringA, stringB) {
    stringA.toUpperCase(); // ignore upper and lowercase
    stringB.toUpperCase(); // ignore upper and lowercase
    if (stringA < stringB) {
        return -1;
    }
    if (stringA > stringB) {
        return 1;
    }
    // names must be equal
    return 0;
}

export const SearchResultsTable = (props) => {
    const [isSortedAscending, setIsSortedAscending] = useState(true);

    function getCountryName (data) {
        const {name : {official}} = data
        return official;
    }

    const handleOnClick = () => {
        const tmp = !isSortedAscending;
        setIsSortedAscending(tmp)
        localStorage.isSortedAscending = tmp;
    }

    // Read the values from localStorage on the initial page load
    useEffect(() => {
        if (localStorage.isSortedAscending) {
            setIsSortedAscending((localStorage.isSortedAscending === "true"));
        }
    }, []);

  function render(data) {
      let countryNames = data.map (d => getCountryName(d));

      if (isSortedAscending) {
         countryNames.sort(alphabetize)
      } else {
         countryNames.sort(alphabetize).reverse()
      }

      return(
          <>
              <button className="Button" onClick={handleOnClick }>{isSortedAscending ? "A-Z" : "Z-A"}</button>
              <table className='SearchResults' >

                  <colgroup>
                      <col/>
                      <col/>
                  </colgroup>

                  <thead>
                  <tr>
                      <th scope="col" className='VisuallyHidden'>Country name</th>
                  </tr>
                  </thead>

                  <tbody>

                  {countryNames.map(countryName => (
                      <tr className='SearchResults-row' key={countryName}>
                          <td className='SearchResults-cell'>

                              <Link to={`/country/${countryName}`} className='SearchResults-bookLink'>
                                  <h2 className='SearchResults-bookTitle'>{countryName}</h2>
                              </Link>
                          </td>
                      </tr>
                  ))}
                  </tbody>

              </table>
          </>)
  }

  return render(props.data);
};

SearchResultsTable.propTypes = {
  data : PropTypes.array,
}

