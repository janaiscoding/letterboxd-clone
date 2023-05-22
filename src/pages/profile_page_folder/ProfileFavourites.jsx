import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { db } from "../../firebase/firebase";
import ProfilePoster from "./ProfilePoster";
const ProfileFavourites = ({apiKey, fetchRequest, fetchResults,newDataGained, setNewDataGained}) => {
    const { uid } = useParams();

    const [favIDs, setFavIDs] = useState([]); 
    const [userName, setUserName] = useState("")
    const fetchUserMoviesDB = (uid) => {
      fetchFavouritesDB(uid);
      setNewDataGained(false);
    };
    const fetchUsername = async (uid) => {
        const userSnap = await getDoc(doc(db, "users", uid));
        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
        } else {
          alert("This user does not exist!");
        }
      };

    const fetchFavouritesDB = async (uid) => {
      const userSnap = await getDoc(doc(db, "users", uid));
      if (userSnap.exists()) {
        let userFavs = userSnap.data().favourites;
        let tempArray = [];
        userFavs.forEach((FM) => {
          tempArray.push(FM.movieID);
        });
        setFavIDs(tempArray);
    
      }
    };
  
    useEffect(() => {
      fetchUserMoviesDB(uid);
      fetchUsername(uid)
    }, [uid,newDataGained]);
  
    return (
        <div className="min-h-[90vh] py-5">
            <div className=" flex flex-col md:w-[950px] md:my-0 md:mx-auto font-['Graphik'] ">
            <div
        className="flex 
      justify-between 
      section-heading 
      text-sh-grey 
      text-xs
      border-b 
      border-solid 
      border-b-grey 
      mb-3"
      >
        <Link to={"/profile/"+ uid} className="text-sm hover:text-hov-blue hover:cursor-pointer uppercase">{userName}'s FAVOURITE MOVIES</Link>
      </div>

          <div className="flex flex-wrap">
      {favIDs.length > 0 ? 
            favIDs.map((id) => (
                <ProfilePoster key={id.id} movieID={id} apiKey={apiKey} setNewDataGained={setNewDataGained}/>
            ))
            : "no fav movies yet"}
            </div>
            </div>
        </div>
    )
}

export default ProfileFavourites