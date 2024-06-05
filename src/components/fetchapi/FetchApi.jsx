import React, { useEffect, useState } from 'react'
import './FetchApi.css';

export default function FetchApi() {
        const [quote, setQuote]=useState(null);
        const [loading, setLoading]=useState(false);
        const [error, setError]=useState(null);

        const api_url="https://api.adviceslip.com/advice";

        const getQuote= async()=>{
            try{
            setLoading(true);
            let response=await fetch(api_url)
            
            if(response.ok !=true){
                setError('An error occurred while fetching the quote');
            }

            let data= await response.json()
            setQuote(data.slip.advice);
            setLoading(false);
            }catch(error){
                setError('An error Occurred while fetching quote');
                setLoading(false)
            }
        }
        useEffect(()=>{
            getQuote();
        },[])
  return (
    <>
    <div className="quote">
        <div className='text-box'>
        {error && <p>{error}</p>}
        {loading && <p>Loading Please Wait...</p>}
        {quote && <p>{quote}</p>}
        </div>
        <button onClick={getQuote} disabled={loading}>Click to Generate a Random Quote</button>
    </div>
    </>
  )
}
