import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

// ***** נתוני המונה לשנת תשפ"ה (הנתונים הדינמיים) *****
const STATS_DATA = [
    // נתון 1: שמאל
    { label: "סך מענקים", endValue: 15.2, suffix: 'M', precision: 1 },
    // נתון 2: מרכז
    { label: "סטודנטים נתמכים", endValue: 5500, suffix: '+', precision: 0 },
    // נתון 3: ימין
    { label: "שיעור הצלחה", endValue: 98, suffix: '%', precision: 0 },
];

export const Home = () => {
    const statsRef = useRef(null); // Ref ל-Intersection Observer
    const [inView, setInView] = useState(false);
    const [currentCounts, setCurrentCounts] = useState(STATS_DATA.map(() => 0));

    // לוגיקת המונה (Counter Animation)
    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        let startTimestamp = null;

        const animateCount = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;

            const newCounts = STATS_DATA.map((stat) => {
                const startValue = 0;
                let end = stat.endValue;

                const currentCount = Math.min(end, startValue + (end - startValue) * (progress / duration));

                if (stat.precision > 0) {
                    return currentCount.toFixed(stat.precision);
                } else {
                    return Math.floor(currentCount).toLocaleString('he-IL');
                }
            });

            setCurrentCounts(newCounts);

            if (progress < duration) {
                window.requestAnimationFrame(animateCount);
            } else {
                setCurrentCounts(STATS_DATA.map(stat => stat.endValue.toFixed(stat.precision).toLocaleString('he-IL')));
            }
        };

        window.requestAnimationFrame(animateCount);
    }, [inView]);


    // לוגיקה לזיהוי גלילה (Intersection Observer) - מפעיל את המונה
    useEffect(() => {
        if (!window.IntersectionObserver || inView) return;

        const observer = new window.IntersectionObserver(
            ([entry]) => {
                // הפעל רק כשהאלמנט נכנס לתצוגה
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(entry.target);
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, [inView]);


    const renderStats = () => (
        <div className="stats-grid-overlay">
            {STATS_DATA.map((stat, index) => (
                <div key={index} className="stat-item-overlay">
                    <div className="stat-number-overlay">
                        {currentCounts[index]}
                        <span className="stat-suffix">{stat.suffix}</span>
                    </div>
                    <div className="stat-label-overlay">{stat.label}</div>
                </div>
            ))}
        </div>
    );


    return (
        // הקונטיינר הראשי (נשאר LTR כדי לא להשפיע על פריסת ה-DOM)
        <div className="home-container-wrapper">

            {/* 1. ה-Div שמחזיק את תמונת הרקע */}
            <div className="home-image-scroller">

                {/* 2. שכבת העל (OVERLAY) המכילה את הנתונים הדינמיים, ממקומת באמצעות Ref */}
                <div ref={statsRef} className="stats-positioning-anchor">
                    {renderStats()}
                </div>

                {/* 3. אזור ה-CTA המקורי (לחיץ) */}
                {/* נניח שזו הנקודה שבה כפתור ההרשמה הראשי נמצא */}
                <div className="cta-overlay-position-main">
                    <NavLink to="/GrantRequest" style={{ textDecoration: 'none' }}>
                        <button className="btn-primary" style={{ width: 'auto', padding: '15px 40px', fontSize: '1.2rem', borderRadius: '50px' }}>
                            הגש/י בקשה למענק
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};