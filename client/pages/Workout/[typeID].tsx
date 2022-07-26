import Link from "next/link"

export default function Type({workouts}:any){
    return(
        <div>
           
                <ul>
                {workouts.sort((a:any,b:any)=>a.week-b.week).map((workout:any,index:number)=>(
                // eslint-disable-next-line react/jsx-key
                <ul className="cards">
                <li className="cards__item">
                 <div className="workoutcard ">
                    <h1>week {workout.week}</h1>
                    <img className="workoutimage card__image--fence" src={workout.img}/>
                    <div className="card__content workoutcardcontent">
                      <div className="card__title ">{workout.name}</div>
                      <Link href={`/oneWorkout/${workout._id}`}><button className="btn btn--block card__btn">learn more</button></Link>
                      <Link href="/Workout"><button className="btn btn--block card__btn but">back</button></Link>

                    </div>
                  </div>
                </li>
          </ul>   
            ))}
            </ul>
          </div>
    )
}
export async function getServerSideProps({params}:any) {
 const workouts  = await fetch (`http://localhost:2000/api/workouts/${params.typeID}`).then(response => response.json())
 return {
    props:{
        workouts
    }
 }
}   