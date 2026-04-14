export const PersonalForm = ({ formData, handleChange, currentUser }) => {
    // קביעה אם המשתמש מחובר ויש נתונים שצריך לנעול
    const isUserDataLocked = !!currentUser.Id;
    
    return (
        <div className="form-step active" data-step="1" aria-live="polite">

            <div className="form-group">
                <label htmlFor="tz">ת.ז. <span className="required">*</span></label>
                <input
                    id="tz"
                    name="tz"
                    value={formData.tz || ''} // הצגת הערך
                    onChange={handleChange}
                    placeholder="211111111"
                    required
                    disabled={isUserDataLocked} // ננעל אם משתמש מחובר
                />
            </div>

            <div className="form-group">
                <label htmlFor="fullName">שם מלא<span className="required">*</span></label>
                <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName || ''} // הצגת הערך
                    onChange={handleChange}
                    placeholder="שם מלא"
                    required
                    disabled={isUserDataLocked} // ננעל אם משתמש מחובר
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="email">דוא"ל <span className="required">*</span></label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email || ''} // הצגת הערך
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    disabled={isUserDataLocked} // ננעל אם משתמש מחובר
                />
            </div>

            <div className="form-group">
                <label htmlFor="birthDate">תאריך לידה<span className="required">*</span></label>
                <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate || ''}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="address">כתובת<span className="required">*</span></label>
                <input
                    id="address"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    placeholder="כתובת מלאה"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">מספר טלפון<span className="required">*</span></label>
                <input
                    id="phone"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    placeholder="05x-xxxxxxx"
                    required
                />
            </div>
        </div>
    );
};