export const CourseForm = ({ formData, handleChange }) => {
    return (
        <div className="form-step active" data-step="3">
            <div className="form-group">
                <label htmlFor="major">מגמה <span className="required">*</span></label>
                <input
                    id="major"
                    name="major"
                    value={formData.major || ''}
                    onChange={handleChange}
                    placeholder="למשל: מדעי המחשב"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="tuition">שכר לימוד שנתי <span className="required">*</span></label>
                <input
                    id="tuition"
                    name="tuition"
                    type="number"
                    value={formData.tuition || ''}
                    onChange={handleChange}
                    placeholder="למשל: 20000"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="studyYears">שנות לימוד <span className="required">*</span></label>
                <input
                    id="studyYears"
                    name="studyYears"
                    type="number"
                    value={formData.studyYears || ''}
                    onChange={handleChange}
                    placeholder="למשל: 3"
                    required
                />
            </div>
        </div>
    );
};