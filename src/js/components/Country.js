import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import {useDataApi} from "../logic/fetchdata";
import '../../css/components/Country.css';

export const Country = ({match}) => {
    const { countryName } = match.params;
    const API = `https://restcountries.com/v3.1/name/`;
    const [{data, isLoading, isError}, doFetch] = useDataApi('');
    useEffect(() => {
        const run =  async () => {
            await doFetch(`${API}${countryName}?fullText=true&fields=name,capital,currencies`);
        };
        run()

    }, [countryName]);

    const render = (data) => {
        if (!data.length) {
            return null;
        }

        const currencies = data[0].currencies;
        const currencyCode = Object.keys(currencies)[0]

        return (
            <>
                <div className="App">
                    <main className="AppContent">
                        <Link to="/" className="Button">Back</Link>
                        <dl className='CountryDetails'>
                            <dt className="Details-title">Country name</dt>
                            <dd className="Details-content">
                                <h1 className='SearchResults-bookTitle'>{countryName}</h1>
                            </dd>

                            <dt className="Details-title">Country capital</dt>
                            <dd className="Details-content">
                                <span>{data[0].capital} </span>
                            </dd>

                            <dt className="Details-title">Currency code</dt>
                            <dd className="Details-content">
                                <span>{currencyCode} </span>
                            </dd>

                            <dt className="Details-title">Currency name</dt>
                            <dd className="Details-content">
                                <span>{currencies[currencyCode].name} </span>
                            </dd>

                            <dt className="Details-title">Currency symbol</dt>
                            <dd className="Details-content">
                                <span>{currencies[currencyCode].symbol}</span>
                            </dd>

                        </dl>
                    </main>
                </div>
            </>
        )
    }

    return render(data)
}