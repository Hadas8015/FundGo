export const FamilyForm = ({ formData, handleChange }) => {
    return (
        <div className="form-step active" data-step="2">
            <div className="form-group">
                <label htmlFor="fatherName">שם אב<span className="required">*</span></label>
                <input
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName || ''}
                    onChange={handleChange}
                    placeholder="שם מלא"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="motherName">שם אם<span className="required">*</span></label>
                <input
                    id="motherName"
                    name="motherName"
                    value={formData.motherName || ''}
                    onChange={handleChange}
                    placeholder="שם מלא"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="numOfChildren">כמות ילדים<span className="required">*</span></label>
                <input
                    type="number"
                    id="numOfChildren"
                    name="numOfChildren"
                    value={formData.numOfChildren || ''}
                    onChange={handleChange}
                    placeholder="0"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="numOfBrothers19">כמות אחים מעל גיל 19<span className="required">*</span></label>
                <input
                    type="number"
                    id="numOfBrothers19"
                    name="numOfBrothers19"
                    value={formData.numOfBrothers19 || ''}
                    onChange={handleChange}
                    placeholder="0"
                    required
                />
            </div>
        </div>
    );
};