import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logoImage from '../pictures/logo.png';

export const Nav = () => {
    const current = useSelector((state) => state.user.current);
    const manager = current && current.Id === "215967449";

    const [showNav, setShowNav] = useState(true);
    const navRef = useRef(null);

    useEffect(() => {
        let lastScrollTop = 0;
        const navHeight = navRef.current ? navRef.current.offsetHeight : 78;

        const handleScroll = () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop && currentScroll > navHeight) {
                setShowNav(false);
            } else if (currentScroll < lastScrollTop || currentScroll < navHeight) {
                setShowNav(true);
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const displayName = current.fullName ? current.fullName : "משתמש";

    // בדיקה אם משתמש מחובר
    const isUserLoggedIn = current && current.Id;

    return (
        <div ref={navRef} className={`nav-wrapper ${showNav ? "nav-show" : "nav-hide"}`}>
            <div className="nav">
                {/* קישורים רגילים - נשארים תמיד מימין (בגלל direction: rtl) */}
                <NavLink to="Home" className="link">דף הבית</NavLink>
                <NavLink to="Login" className="link">כניסה</NavLink>
                <NavLink to="GrantRequest" className="link">הגשת בקשה</NavLink>
                <NavLink to="ViewStatus" className="link">צפיה בסטטוס</NavLink>

                {manager && <NavLink to="ViewRequests" className="link">צפיה בבקשות</NavLink>}

                {/* ***** אזור שמאל - משתמש ב-margin-right: auto כדי לדחוף אותו שמאלה ***** */}
                <div className="nav-end-spacer"></div>

                {/* ***** אזור הלוגו והברכה (מוצבים תמיד הכי שמאלה בתוך Flexbox) ***** */}
                {/* משתמשים בקלאס דינמי כדי לשלוט בפריסה ב-CSS */}
                <div className={`nav-logo-area ${isUserLoggedIn ? 'logged-in' : 'logged-out'}`}>

                    {/* הלוגו - מוצג תמיד */}
                    <img src={logoImage} alt="FundGo Logo" className="nav-logo" />

                    {/* הברכה - מוצגת רק אם מחובר, יושבת משמאל ללוגו */}
                    {isUserLoggedIn && (
                        <p className="hello">שלום {displayName}</p>
                    )}
                </div>
            </div>
        </div>
    );
};