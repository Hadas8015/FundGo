import { useEffect } from 'react'; // הוספת useRef
import { useSelector } from "react-redux";
import confetti from 'canvas-confetti';

// ***** פונקציית הפעלת הנצנוץ המכובד (Sparkle) *****
const runSparkleConfetti = () => {
    const sparkleColors = ['#FFD700', '#C0C0C0', '#4169E1', '#E8E8E8'];

    // ***** שינוי מיקום ל-y: 1 (תחתית המסך) ואנגל רחב יותר *****
    const defaults = {
        spread: 100,
        ticks: 80,
        gravity: 0.8,
        decay: 0.95,
        startVelocity: 40,
        shapes: ['circle', 'square'],
        colors: sparkleColors
    };

    // ירייה ממרכז התחתית כלפי מעלה
    function shootFromBottom() {
        confetti({
            ...defaults,
            particleCount: 50,
            scalar: 1.2,
            origin: { x: 0.5, y: 1 }
        });

        confetti({
            ...defaults,
            particleCount: 30,
            scalar: 0.75,
            origin: { x: 0.5, y: 1 }
        });
    }

    // ירייה מהפינות התחתונות
    function shootFromSides() {
        confetti({
            ...defaults,
            particleCount: 40,
            angle: 60, // יורה בזווית ימינה
            origin: { x: 0, y: 1 }
        });
        confetti({
            ...defaults,
            particleCount: 40,
            angle: 120, // יורה בזווית שמאלה
            origin: { x: 1, y: 1 }
        });
    }

    // מפעיל את היריות במרווחים קצרים
    shootFromSides();
    shootFromBottom();
};


export const ViewStatus = () => {
    const currentUser = useSelector(state => state.user.current);
    const requests = useSelector(state => state.request.list);

    const userId = currentUser.Id;

    const userRequests = userId ? requests.filter(req => req.userId === userId) : [];

    const lastRequest = userRequests.length > 0
        ? userRequests.sort((a, b) => b.id - a.id)[0]
        : null;

    // ***** לוגיקת הפעלת הנצנוץ ו-Cleanup *****
    useEffect(() => {
        if (lastRequest && lastRequest.status === 'allow' && typeof confetti === 'function') {

            // מפעיל את הקונפטי
            runSparkleConfetti();

            // ***** Cleanup: מובטח שכל פיצוצי הקונפטי נעצרים כשהקומפוננטה נסגרת *****
            return () => {
                // המטודה confetti.reset() מפסיקה כל אנימציה שרצה
                if (typeof confetti.reset === 'function') {
                    confetti.reset();
                }
            };
        }
    }, [lastRequest]);

    const getStatusMessage = (status) => {
        switch (status) {
            case "waiting":
                return "הבקשה שלך עדיין ממתינה לבדיקה.";
            case "allow":
                return "הבקשה שלך אושרה! בהצלחה בהמשך!!!";
            case "reject":
                return "מצטערים, הבקשה שלך נדחתה. לערעור, אנא פנו למנהל.";
            default:
                return "סטטוס לא ידוע.";
        }
    };

    const statusColor = (status) => {
        if (status === 'allow') return 'green';
        if (status === 'reject') return 'red';
        return 'blue';
    };

    return (
        <div className="viewDetails" style={{ maxWidth: '600px', margin: '10vh auto' }}>
            <div id="status" className="form-card" style={{ maxWidth: '600px', margin: '10vh auto', textAlign: 'right', padding: '20px', direction: 'rtl' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>צפייה בסטטוס הבקשה</h1>

                {!userId && (
                    <p className="error-message active">עליך להתחבר כדי לצפות בסטטוס הבקשה שלך.</p>
                )}

                {userId && !lastRequest && (
                    <p className="error-message active">לא נמצאה בקשה עבור המשתמש הנוכחי. אנא הגש בקשה חדשה.</p>
                )}

                {lastRequest && (
                    <div style={{ marginTop: '20px', padding: '15px' }}>

                        {/* ***** שורת תאריך הגשה (Flexbox) ***** */}
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', direction: 'rtl', marginBottom: '10px' }}>
                            {/* Key: נצמד לימין (Flex-Start ב-RTL) */}
                            <strong style={{ whiteSpace: 'nowrap', marginLeft: '10px' }}>תאריך הגשה:</strong>

                            {/* Value: נדחף לשמאל (Flex-End) */}
                            <span style={{ direction: 'ltr', flexGrow: 1, textAlign: 'right' }}>
                                {new Date().toLocaleDateString()}
                            </span>
                        </div>

                        {/* ***** שורת בקשה מספר (Flexbox) ***** */}
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', direction: 'rtl', marginBottom: '10px' }}>
                            {/* Key: נצמד לימין (Flex-Start ב-RTL) */}
                            <strong style={{ whiteSpace: 'nowrap', marginLeft: '10px' }}>בקשה מספר:</strong>

                            {/* Value: נדחף לשמאל (Flex-End) */}
                            <span style={{ direction: 'ltr', flexGrow: 1, textAlign: 'right' }}>
                                {lastRequest.id}
                            </span>
                        </div>

                        <h2 style={{ color: statusColor(lastRequest.status), marginTop: '30px' }}>
                            {getStatusMessage(lastRequest.status)}
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};