import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectNotAllowed } from "../Slices/requestSlice";
import "./Forms.css";

export const ViewRequests = () => {
    const navigate = useNavigate();

    const nonAllowedRequests = useSelector(selectNotAllowed);

    const viewDetails = (requestId) => {
        // ניווט לנתיב המוחלט
        navigate(`/RequestDetails/${requestId}`);
    };

    return <>
        <div>
            <div>
                <h1>בקשות הממתינות לבדיקה</h1>

                {nonAllowedRequests.length === 0 && (
                    <p className="error-message active" id="waitingToAllow"
                        style={{ padding: '30px' }}>
                        אין בקשות הממתינות לאישור.
                    </p>
                )}

                {nonAllowedRequests.length > 0 && (
                    <div id="viewDetails">
                        {nonAllowedRequests.map((req) => (
                            <div
                                id="request-card"
                                className="form-card"
                                key={req.id}
                                onClick={() => viewDetails(req.id)}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >

                                <div>
                                    <p>בקשה מספר: {req.id}</p>
                                    <p>סטודנט: {req.personal?.fullName || 'שם לא זמין'}</p>
                                </div>


                                <button className="btn-primary"
                                    onClick={(e) => { e.stopPropagation(); viewDetails(req.id); }}>
                                    צפה בפרטים
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </>;
};