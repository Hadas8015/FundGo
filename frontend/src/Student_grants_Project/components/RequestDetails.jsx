import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { allow, reject } from '../Slices/requestSlice';
import { toast } from 'react-toastify';

export const RequestDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();//מעבר לדף
    const dispatch = useDispatch(); //שליחה לחלל
    const requestId = parseInt(id);//int המרה ל

    //בחירת הבקשה מהרידקס ע"פ הקוד שלה
    const request = useSelector(state =>
        state.request.list.find(req => req.id === requestId)
    );

    //אם אין בקשות תציג הודעת שגיאה
    if (!request) {
        return (
            <div className="container1" style={{ maxWidth: '600px', margin: '10vh auto' }}>
                <div className="error-message active">שגיאה: בקשה מספר {id} לא נמצאה.</div>
            </div>
        );
    }

    //בלחיצה על כפתור האישור- מעדכן דרך הרידקס את סטטוס הבקשה, שולח הודעה למנהל שהבקשה אושרה ומנתב אל רשימת הבקשות הממתינות לבדיקה
    const handleAllow = () => {
        dispatch(allow(requestId));
        toast.success(`בקשה מספר ${requestId} אושרה בהצלחה!`, { theme: "colored" });
        navigate('/ViewRequests');
    };

    //כפתור דחית בקשה- דומה לאישור הבקשה
    const handleReject = () => {
        dispatch(reject(requestId));
        toast.error(`בקשה מספר ${requestId} נדחתה.`, { theme: "colored" });
        navigate('/ViewRequests');
    };

    // מטה-דאטה לשדות
    const FIELD_LABELS = {
        tz: "תעודת זהות", fullName: "שם מלא", email: "דוא\"ל", birthDate: "תאריך לידה", address: "כתובת", phone: "טלפון",
        fatherName: "שם אב", motherName: "שם אם", numOfChildren: "מספר ילדים", numOfBrothers19: "אחים מעל 19",
        major: "מגמת לימוד", tuition: "שכר לימוד שנתי", studyYears: "שנות לימוד",
        bankOwnerName: "שם בעל ח-ן", bankOwnerTz: "ת.ז בעל ח-ן", bankName: "שם בנק", branchNumber: "מס' סניף", accountNumber: "מס' ח-ן",
    };

    //למטה- נשלח לפונקציה זו ערכים שונים- ע"פ החלקים השונים
    // רכיב עזר להצגת פרטי חלק ספציפי (בפריסת עמודות)
    const renderSection = (title, data) => {
        // if (!data || Object.keys(data).length === 0) return null;


        //מציג את הנתונים, כל אחד בכרטיסיה נפרדת
        return <>
            <div key={title} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #dee3f7', borderRadius: '10px', backgroundColor: 'white' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#85A3FF', borderBottom: '2px solid #dee3f7', paddingBottom: '10px', marginBottom: '15px' }}>{title}</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    columnGap: '120px', /* רווח גדול בין עמודה ימין לעמודה שמאל */
                    rowGap: '20px' /* רווח קטן יותר בין שורה לשורה */
                }}>
                    {/*map מעבר על כל הפרטים שבכל כרטיסיה והצגת ע"י */}
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key}
                            style={{
                                padding: '8px 0',
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'baseline',
                                direction: 'rtl'
                            }}>

                            {/* Key - נצמד לימין */}
                            <strong style={{ flexShrink: 0, marginLeft: '10px', whiteSpace: 'nowrap', direction: 'rtl' }}>
                                {FIELD_LABELS[key] || key}:
                            </strong>

                            {/* Value*/}
                            <span style={{
                                color: '#475569',
                                direction: 'rtl',
                                flexGrow: 1,
                                textAlign: 'left'
                            }}>
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>;
    };


    return <>
        <div className="container1" style={{ maxWidth: '900px', margin: '10vh auto', direction: 'rtl' }}>
            <div className="form-card" style={{ textAlign: 'right', padding: '40px' }}>
                <h1 style={{ marginBottom: '15px', color: '#1e293b' }}>פרטי בקשה מספר {request.id}</h1>
                <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                    סטטוס:
                    {/*הצגת המילה- בהמתנה בצבע כתום*/}
                    <span style={{ color: '#ff9800', background: '#fffbeb', padding: '5px', borderRadius: '5px' }}>
                        ממתינה
                    </span>
                </p>

                {/*נשלח לפונקציה שמציגה את הנתונים ע"פ כרטיסיות */}
                {renderSection("פרטים אישיים", request.personal)}
                {renderSection("פרטי משפחה", request.family)}
                {renderSection("פרטי לימודים", request.studies)}
                {renderSection("פרטי בנק", request.bank)}

                {/* הצהרה */}
                <div style={{ marginBottom: '30px', padding: '20px', border: '2px dashed #38dc35ff', borderRadius: '10px', backgroundColor: '#f7fff8ff' }}>
                    <h3 style={{ color: '#35dc5cff', marginBottom: '10px' }}>הצהרת נכונות</h3>
                    <p style={{ color: '#1e293b' }}>
                        {request.declaration ? "המשתמש אישר את נכונות כל הפרטים שהוזנו." : "המשתמש לא אישר את ההצהרה (ייתכן שהוגשה דרך ערוץ שונה)."}
                    </p>
                </div>


                {/* כפתורי אישור ודחייה*/}
                {request.status === 'waiting' && (
                    <div className="button-group" style={{ justifyContent: 'center', marginTop: '30px' }}>
                        <button
                            className="btn-primary"
                            onClick={handleAllow}
                            style={{ background: '#10b981' }}>
                            אשר בקשה
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={handleReject}
                            style={{ background: '#DC3545', color: 'white', marginLeft: '110px' }}>
                            דחה בקשה
                        </button>
                    </div>
                )}

                {/* לחצן חזור */}
                <button
                    className="btn-secondary"
                    onClick={() => navigate('/ViewRequests')}
                    style={{ marginTop: '20px', width: '100%', background: '#dee3f7' }}>
                    חזור לרשימת הבקשות
                </button>
            </div>
        </div>
    </>;
};