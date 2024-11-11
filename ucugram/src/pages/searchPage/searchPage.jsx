import React, { useState, useEffect } from "react";
import NavBar from "../../components/sideNavBar/sideNavBar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useGetAllUsers from "../../hooks/useGetAllUsers.jsx";
import { useGetProfile } from "../../hooks/useGetProfile";
import classes from "./searchPage.module.css";

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { state: authState } = useAuth();
    const navigate = useNavigate();
    const getAllUsers = useGetAllUsers();
    const getProfile = useGetProfile();

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getAllUsers();
            setAllUsers(users);
        };
        fetchUsers();
    }, [getAllUsers]);
    
    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("/home");
        }
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, [authState]);

    useEffect(() => {
        setSearchResults(
            allUsers.filter((user) =>
                user.username.toLowerCase().startsWith(search.toLowerCase())
            )
        );
    }, [search]);

    const handleGoProfile = async (searchUsername, searchUserId) => {
        if (searchUsername !== authState.user.username) {
            await getProfile(searchUserId);
            console.log("searchUserId: ", searchUserId);
            navigate(`/profile/${searchUsername}`);
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
                        <div key={user._id} className={classes.searchResult} onClick={() => handleGoProfile(user.username, user._id)}>
                            <div>
                                <img src={user.profilePicture || "/default-profile.png"} alt={`${user.username}'s profile`} />
                            </div>
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
