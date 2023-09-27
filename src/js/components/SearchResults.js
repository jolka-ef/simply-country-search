import React, {useEffect, useState} from 'react';
import {useDataApi} from "../logic/fetchdata";
import {SearchResultsTable} from   "./SearchResultsTable"
import {Error} from "./Error";
import {Loader} from "./Loader";
import "../../css/components/SearchResults.css";
import PropTypes from 'prop-types';


export const SearchResults = (props) => {
   const API = `https://restcountries.com/v3.1/name/`;
   const {query} = props;

    const [{data, isLoading, isError}, doFetch] = useDataApi('');

    useEffect(() => {
            const run =  async () => {
                await doFetch(`${API}${query}?fields=name`);
            };
            run()
    }, [query]);

    return (
        <>
            {isError ?
                <Error message="We're sorry but something went terribly wrong..."/>
                : null
            }


            { data.length > 0  ? (
                <>
                <SearchResultsTable data={data}/>

                </>
            ):(
                !isLoading ?
                    <p className='SearchResults-info'>No results to show.</p>
                    : null)
            }

            {isLoading ? <Loader/> : null}
        </>
    )
};

SearchResults.propTypes = {
    query : PropTypes.string
};
