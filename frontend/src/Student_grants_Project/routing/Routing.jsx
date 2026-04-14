import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Nav } from "./Nav"
import { Home } from "../components/Home"
import { Login } from "../components/Login"
import { GrantRequest } from "../components/GrantRequest";
import { ViewStatus } from "../components/ViewStatus"
import { ViewRequests } from "../components/ViewRequests"
import { Error } from "../components/Error"
import { SignUp } from "../components/SignUp"
import { RequestDetails } from "../components/RequestDetails" // ודא שיש ייבוא זה

export const Routing = () => {
    return <>
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="Home" element={<Home />} />
                <Route path="Login" element={<Login />}></Route>
                <Route path="SignUp" element={<SignUp />}></Route>
                <Route path="GrantRequest" element={<GrantRequest />} />
                <Route path="ViewStatus" element={<ViewStatus />} />

                {/* ***** נתיב 1: רשימת הבקשות (הנתיב הבסיסי) ***** */}
                <Route path="ViewRequests" element={<ViewRequests />} />

                {/* ***** נתיב 2: פרטי בקשה (חייב להיות נתיב נפרד עם פרמטר) ***** */}
                <Route path="RequestDetails/:id" element={<RequestDetails />} />

                {/* ברירת מחדל / שגיאה */}
                <Route path="" element={<Home />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    </>
}