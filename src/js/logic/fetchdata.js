import {useEffect, useState} from 'react';
import axios from 'axios'
import serializeForm from "form-serialize";


export const useDataApi = (urlRequest) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [url, setUrl] = useState(urlRequest);

    useEffect(() => {



        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                let result = await axios(url);


                    if (result.data) {
                        setData(result.data);
                        localStorage[url] = JSON.stringify(result.data)
                    }
                }
            catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        }

        if (url) {
            if (localStorage[url]) {
                setData(JSON.parse(localStorage[url]));
            } else {
                fetchData();
            }
        }
    }, [url]);

    return [{ data, isLoading, isError }, setUrl];
};





