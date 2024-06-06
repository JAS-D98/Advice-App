import React, { useState } from 'react'
import './SearchApi.css'
import BarLoader from "react-spinners/BarLoader";

const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function SearchApi() {

    const [search, setSearch]=useState(null);
    const [quoteResults, setQuotesResults]=useState(null)
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(null);
    const [color, setColor] = useState("#002D62");

    const briefMessage=document.querySelector('h2');
    
    const handleWord=(e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            setLoading(true);
            const response=await fetch(`https://api.adviceslip.com/advice/search/${search}`);
            console.log(response);
            if(!response.ok){
                setError(`Could not find ${search} quote`)
            }
            const data=await response.json();
        //    console.log(data.slips);
           setQuotesResults(data.slips);
           setLoading(false)
           briefMessage.style.display='none';
        }catch(error){
            setError(`Could not find advice, please check your internet connection and try again`);
            setQuotesResults(null)
            setLoading(false)
        }
    }
  return (
    <div className="search-container">
        <h1>Search a Text concerning any field</h1>
        <form className="search-box">
            <input placeholder="Search Here...e.g life" onChange={handleWord}/>
            <button onClick={handleSubmit} disabled={loading}>Search Quote</button>
        </form>
        <div className="search-results">
            {loading && 
            <>
             <h1 className='loader'>Loading Please Wait....</h1>
             <BarLoader color={color} loading={loading} cssOverride={override} size={150} aria-label="Loading Spinner" data-testid="loader"/>
            </>
            }
            {error && <p className='error'>{error}</p>}
            {quoteResults &&(<h1>{ quoteResults.length > 0 ? `${quoteResults.length} Results Found` : 'No Results Found'}</h1>)}
            <h2>Incase of any Results Found, they will be displayed below.</h2>
           {quoteResults &&
           <div>
           <h1>Your Search Results are Listed Below</h1>
            <ol>
            {quoteResults.map((result, i)=>{
                    return(
                        <li key={i}>{result.advice}</li>
                    )
                })}
            </ol>
            </div>
           }
        </div>
    </div>
  )
}
