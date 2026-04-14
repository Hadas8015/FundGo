export const Verify = ({ formData, handleChange }) => {
    return (
        <div className="form-step active" data-step="5">
            <h2 className="form-title">הצהרת נכונות</h2>
            <p className="form-subtitle">אנא אשר/י שהפרטים שהוזנו נכונים ומלאים.</p>
            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="declaration"
                        checked={formData.declaration || false}
                        onChange={handleChange}
                        required
                    /> הצהרה: אני מאשר/ת שכל הפרטים נכונים
                </label>
            </div>
        </div>
    );
};