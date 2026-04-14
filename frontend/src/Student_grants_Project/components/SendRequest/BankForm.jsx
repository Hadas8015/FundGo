export const BankForm = ({ formData, handleChange }) => {
    return (
        <div className="form-step active" data-step="4">
            <div className="form-group">
                <label htmlFor="bankOwnerName">שם בעל ח-ן <span className="required">*</span></label>
                <input
                    id="bankOwnerName"
                    name="bankOwnerName"
                    value={formData.bankOwnerName || ''}
                    onChange={handleChange}
                    placeholder="שם מלא"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="bankOwnerTz">ת.ז בעל ח-ן <span className="required">*</span></label>
                <input
                    id="bankOwnerTz"
                    name="bankOwnerTz"
                    value={formData.bankOwnerTz || ''}
                    onChange={handleChange}
                    placeholder="123456789"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="bankName">שם בנק <span className="required">*</span></label>
                <input
                    id="bankName"
                    name="bankName"
                    value={formData.bankName || ''}
                    onChange={handleChange}
                    placeholder="למשל: בנק לאומי"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="branchNumber">מס סניף <span className="required">*</span></label>
                <input
                    id="branchNumber"
                    name="branchNumber"
                    type="number"
                    value={formData.branchNumber || ''}
                    onChange={handleChange}
                    placeholder="למשל: 123"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="accountNumber">מס ח-ן <span className="required">*</span></label>
                <input
                    id="accountNumber"
                    name="accountNumber"
                    type="number"
                    value={formData.accountNumber || ''}
                    onChange={handleChange}
                    placeholder="למשל: 12345678"
                    required
                />
            </div>
        </div>
    );
};