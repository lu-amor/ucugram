import React, { useState, useEffect } from "react";
import NavBar from "../../components/sideNavBar/sideNavBar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import classes from "./searchPage.module.css";

const SearchPage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { state: authState } = useAuth();
    const navigate = useNavigate();
    
    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("/home");
        }
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, [navigate]);

    const allUsers = [
        {
            "_id": "67163a401a1b5ed932d584c1",
            "username": "user1",
            "email": "email@example.com",
            "profilePicture": "",
            "createdAt": "2024-10-21T11:25:52.767Z",
            "__v": 6,
            "description": "",
            "friends": []
        },
        {
            "_id": "671646631181ec9a1080c4f9",
            "username": "usedr1",
            "email": "email@wexample.com",
            "profilePicture": "",
            "createdAt": "2024-10-21T12:17:39.061Z",
            "__v": 4,
            "description": "",
            "friends": []
        },
        {
            "_id": "671fad5253ab7318e7a6e0a7",
            "username": "manu22",
            "email": "manuela.guedez@correo.ucu.edu.uy",
            "profilePicture": "",
            "friends": [
                "6722a0918c4ff2eaf7022710",
                "671fad5253ab7318e7a6e0a7",
                "671fad5253ab7318e7a6e0a7"
            ],
            "createdAt": "2024-10-28T15:27:14.708Z",
            "__v": 53,
            "description": "this is my new profile description"
        },
        {
            "_id": "671ffc11826c24a7fdca458c",
            "username": "guilleacq",
            "email": "guilleacq@ucu.edu.uy",
            "profilePicture": "",
            "friends": [],
            "createdAt": "2024-10-28T21:03:13.256Z",
            "__v": 4,
            "description": ""
        },
        {
            "description": "",
            "_id": "671ffc3e826c24a7fdca4591",
            "username": "guilleacq123",
            "email": "guilleacq@correo.ucu.edu.uy",
            "profilePicture": "",
            "friends": [],
            "createdAt": "2024-10-28T21:03:58.619Z",
            "__v": 0
        },
        {
            "_id": "6720010b826c24a7fdca45c1",
            "username": "vale1234",
            "email": "valentina.gonzalez.a@correo.ucu.edu.uy",
            "profilePicture": "",
            "friends": [],
            "createdAt": "2024-10-28T21:24:27.180Z",
            "__v": 4,
            "description": ""
        },
        {
            "_id": "6722a0918c4ff2eaf7022710",
            "username": "emilia2002",
            "email": "emilia@correo.ucu.edu.uy",
            "profilePicture": "",
            "friends": [
                "671fad5253ab7318e7a6e0a7"
            ],
            "createdAt": "2024-10-30T21:09:37.033Z",
            "__v": 33,
            "description": ""
        },
        {
            "description": "",
            "_id": "6722b7818c4ff2eaf7022775",
            "username": "jechague",
            "email": "josea.echague@ucu.edu.uy",
            "profilePicture": "",
            "friends": [],
            "createdAt": "2024-10-30T22:47:29.437Z",
            "__v": 0
        }
    ]

    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState(allUsers);

    useEffect(() => {
        setSearchResults(
            allUsers.filter((user) =>
                user.username.toLowerCase().startsWith(search.toLowerCase())
            )
        );
        console.log(searchResults);
    }, [search]);

    const handleGoProfile = async (username, userId) => {
        if (username !== authState.user.username) {
            await getProfile(userId);
            navigate(`/friendProfile/${username}`);
        } else {
            navigate("/myProfile");
        }
    };

    return (
        <>
            <NavBar />
            <div className={`column ${windowWidth > 950 ? "is-10" : ""} ${classes.searchPage}`}>
                <div>
                    <p className={classes.header}>Find your friends!</p>
                    <div className={classes.searchContent}>
                        <input
                            className={`input is-rounded ${classes.searchBar}`}
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                </div>
                <div className={classes.searchResults}>
                    {searchResults.map((user) => (
                        <div key={user._id} className={classes.searchResult} onClick={handleGoProfile(user.username, user._id)}>
{/*                             <div>
                                <img src={user.profilePicture || "/default-profile.png"} alt={`${user.username}'s profile`} />
                            </div> */}
                            <div className={classes.pfp}/>
                            <p className={classes.username}>{user.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SearchPage;
