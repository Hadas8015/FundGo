import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../Slices/userSlice";

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const list = useSelector(x => x.user.list)

    const [error, setError] = useState("");
    const [tempId, setTempId] = useState("");
    const [tempEmail, setTempEmail] = useState("");
    const [tempFullName, setTempFullName] = useState("");    // השדות האחרים (fullName, email) הוסרו מה-State המקומי, מאחר שלא נדרשים ללוגין

    const handleLogin = () => {
        setError("")

        // 1. חיפוש משתמש לפי ת.ז.
        const userIndex = list.findIndex(x => x.Id === tempId);

        if (userIndex === -1) {
            setError("משתמש לא קיים, יש להרשם");
            return;
        }

        const userToLogin = list[userIndex];

        // 3. הצבת המשתמש הנוכחי (האובייקט המלא)
        dispatch(setCurrent(userToLogin));

        // 4. מעבר לעמוד הבית
        navigate("/Home");
    };

    return (
        <div className="container1">
            <div className="form-card">
                <div className="form-content">
                    <h2 className="form-title">Login</h2>

                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className="form-group">
                            <label htmlFor="fullName">FullName</label>
                            <input
                                id="fullName"
                                type="text"
                                placeholder="Keren Cohen"
                                value={tempFullName}
                                onChange={(e) => setTempFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input
                                id="Email"
                                type="text"
                                placeholder="213@123"
                                value={tempEmail}
                                onChange={(e) => setTempEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="Id">Tz</label>
                            <input
                                id="Id"
                                type="text"
                                placeholder="111111"
                                value={tempId}
                                onChange={(e) => setTempId(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className="error-message active">{error}</div>}

                        <div className="button-group">
                            <button
                                type="button"
                                className="btn-primary"
                                id="btn_log"
                                onClick={handleLogin}
                            >
                                כניסה
                            </button>

                            <label dir="rtl">אין לכם עדיין חשבון?</label>
                            <Link to="/SignUp">
                                <button type="button" className="btn-secondary">הרשמה</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};