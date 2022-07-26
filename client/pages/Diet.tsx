/* eslint-disable react/jsx-key */
// @ts-nocheck
import Link from 'next/link'
import { useState } from 'react'

export default function Diet({diets}:any){
    const [formInput ,setFormInput] = useState([])
    const [searchTerm, setSearchTerm]= useState("")
    const [oldDiets, setDiets] = useState(diets)
    




  const handleInput = (event: any) => {
    let { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
    setSearchTerm(event.target.value);
  };
  const search = async (event) => {
    event.preventDefault();
    let newDiets = await fetch(
      `http://localhost:2000/api/search/${formInput.searchTerm}`
    ).then((response) => response.json());
    setDiets(newDiets);
    console.log(newDiets);
  };
  return (
        <div>
            <div>
                <form onSubmit={search}>
                    <input className="search" name="searchTerm" value={searchTerm} onChange={handleInput} type ="text" required />
                    <button className='btn-search'>search</button>
                </form>
            </div>

            <div className='btn-diet-workouts'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <Link href="Diet/breakfast">
            <button className='custom-btn btn-16'>Breakfast</button>
             </Link>
             <Link href="Diet/lunch">
            <button className='custom-btn btn-16'>Lunch</button>
             </Link>
             <Link href="Diet/dinner">
            <button className='custom-btn btn-16'>Dinner</button>
             </Link>

            </div>
             <div className="search-container">
  </div>
            {oldDiets.map((diet:any,index:number)=>(
              <div key={diet._id}>
                   <ul className="cards">
                   <li className="cards__item">
                    <div className="card">
                       <img className="card__image card__image--fence" src={diet.image}/>
                       <div className="card__content">
                         <div className="card__title">{diet.nameReceipe}</div>
                         <p className="card__text">{diet.description} </p>
                         <Link href={`Onediet/${diet._id}`}><button className="btn btn--block card__btn">Show more</button></Link>
                       </div>
                     </div>
                   </li>
             </ul> 
             </div>  
            )
            )}
    
          </div>
    )
}
export async function getStaticProps() {
    const diets = await fetch ("http://localhost:2000/api/diets").then(response => response.json())
    
    return {
        props:{
            diets
        }
    }
}   




 



