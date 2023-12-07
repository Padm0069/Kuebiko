import React, { useEffect, useState } from 'react';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import Reader from "./Reader/reader";
import { Switch, Route, Redirect } from 'react-router-dom';
import CreateBook from './Writer/createBook';
import Login from './Login/login';
import CreateChapter from './Writer/createChapter';
import Footer from './footer';
import { Landing } from "./Landing";
import { Browse } from "./Browsing-page";
import Navbar from "./Browsing-page/Navbar";
import BookCardComp from "./BookCardBoody";
import AllBooks from './AllBooks';


function Main() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState("");
    const [bookname, setBookName] = useStateWithCallbackLazy("");
    const [logout, setLogOut] = useState(false);

    const handleChange = (username) => {
        setLoggedIn(true);
        setUser(username);
    }

    const handleLogOut = () => {
        setLogOut(true);
    }

    useEffect(() => {
        if (logout) {
            localStorage.removeItem("user");
            setLoggedIn(false);
            setUser("");
        }
    }, [logout]);

    useEffect(() => {
        if (isLoggedIn) {
            localStorage.setItem("user", user);
        } else {
            if (localStorage.getItem("user")) {
                setLoggedIn(true);
                setUser(localStorage.getItem("user"));
            }
        }
    }, [isLoggedIn, user]);

    return (
        <React.Fragment>
        <Landing handleLogOut={handleLogOut} isLoggedIn={isLoggedIn} user={user} />
        {/* <Navbar handleLogOut={handleLogOut} isLoggedIn={isLoggedIn} user={user} />
         */}
            <Browse />
            <Footer />
        </React.Fragment>
    )

}

export default Main;



