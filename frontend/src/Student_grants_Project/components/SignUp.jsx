import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../Slices/userSlice";
import { useState } from "react";
import './Forms.css';


export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const current = useSelector(state => state.user.current);
    const list = useSelector(state => state.user.list);


    const [tempFullName, setTempFullName] = useState("");
    const [tempId, setTempId] = useState("");
    const [tempEmail, setTempEmail] = useState(""); // אם רוצים לשמור גם את האימייל
    const [error, setError] = useState("");


    const handleSignUp = (e) => {
        setError("");

        const newUser = {
            Id: tempId,
            fullName: tempFullName,
            email: tempEmail,
        };

        const exists = list.some(u => u.Id === tempId);
        if (exists) {
            setError("משתמש קיים, יש להתחבר");
            return;
        }

        dispatch(add(newUser));

        // מעבר לעמוד הבית
        navigate("/home");
    };

    return <>
        <div className="container1">
            <div className="form-card">
                <div className="form-content"></div>
                <h2 className="SignUp-title">Sign Up</h2>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label for="name">Name </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Eren Buruk"
                            name="fullName"
                            value={tempFullName}
                            onChange={(e) => setTempFullName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label for="email">Email </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="me@example.com"
                            name="email"
                            onChange={(e) => setTempEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label for="Id">Tz </label>
                        <input
                            id="Id"
                            type="Id"
                            placeholder="Id"
                            name="Id"
                            value={tempId}
                            onChange={(e) => setTempId(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-message active">{error}</div>}
                    <button className="btn-primary"
                        id="btn_Sign"
                        type="button"
                        value="Sign up"
                        onClick={handleSignUp}>
                        Sign up
                    </button>
                    <div>
                    </div>
                </form>
            </div>
        </div>
    </>

    {/* <div className="cyrcle"></div> */ }
};