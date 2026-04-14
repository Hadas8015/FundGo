import "./Forms.css";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {savePersonal, saveFamily, saveStudies, saveBank, saveDeclaration, add as addRequest, resetDraft // נשמר לאיפוס הטיוטה לאחר שליחה
     } from "../Slices/requestSlice";
import { PersonalForm } from "./SendRequest/PersonalForm";
import { FamilyForm } from "./SendRequest/FamilyForm";
import { CourseForm } from "./SendRequest/CourseForm";
import { BankForm } from "./SendRequest/BankForm";
import { Verify } from "./SendRequest/Verify";
import { Apply } from "./SendRequest/Apply";


export const GrantRequest = () => {
     const dispatch = useDispatch();

     // selectors
     const { grantDraft } = useSelector((state) => state.request);
     const currentUser = useSelector((state) => state.user.current);

     const totalSteps = 5;
     const [currentStep, setCurrentStep] = useState(1);
     const [error, setError] = useState("");

     const [formData, setFormData] = useState({
          ...grantDraft.personal,
          ...grantDraft.family,
          ...grantDraft.studies,
          ...grantDraft.bank,
          declaration: grantDraft.declaration || false,
          submitted: false,
     });

     // פונקציית שמירה שלב (Callback יציב)
     const saveStepData = useCallback((step, data) => {
          switch (step) {
               case 1:
                    const personalData = { tz: data.tz, fullName: data.fullName, email: data.email, address: data.address, phone: data.phone, birthDate: data.birthDate };
                    dispatch(savePersonal(personalData));
                    break;
               case 2:
                    const familyData = { fatherName: data.fatherName, motherName: data.motherName, numOfChildren: data.numOfChildren, numOfBrothers19: data.numOfBrothers19 };
                    dispatch(saveFamily(familyData));
                    break;
               case 3:
                    const studiesData = { major: data.major, tuition: data.tuition, studyYears: data.studyYears };
                    dispatch(saveStudies(studiesData));
                    break;
               case 4:
                    const bankData = { bankOwnerName: data.bankOwnerName, bankOwnerTz: data.bankOwnerTz, bankName: data.bankName, branchNumber: data.branchNumber, accountNumber: data.accountNumber };
                    dispatch(saveBank(bankData));
                    break;
               case 5:
                    dispatch(saveDeclaration(data.declaration));
                    break;
               default:
                    break;
          }
     }, [dispatch]);

     // ***** useEffect לטעינת נתונים (המצב היציב והראשוני) *****
     useEffect(() => {
          let stepData = {};
          const draft = grantDraft || {};

          // טוען נתוני דראפט
          switch (currentStep) {
               case 1: stepData = draft.personal; break;
               case 2: stepData = draft.family; break;
               case 3: stepData = draft.studies; break;
               case 4: stepData = draft.bank; break;
               case 5: stepData = { declaration: draft.declaration }; break;
               default: break;
          }

          // דריסת פרטי משתמש מחובר (מבוצע רק אם השדות ריקים או בשלב 1)
          if (currentStep === 1 && currentUser && currentUser.Id) {

               let userDataToOverwrite = {};

               // דורס רק אם הנתון בטופס הנוכחי ריק, כדי לשמור על קלט משתמש
               if (!formData.tz || formData.tz === draft.personal?.tz) {
                    userDataToOverwrite.tz = currentUser.Id;
               }
               if (!formData.fullName || formData.fullName === draft.personal?.fullName) {
                    userDataToOverwrite.fullName = currentUser.fullName;
               }
               if (!formData.email || formData.email === draft.personal?.email) {
                    userDataToOverwrite.email = currentUser.email;
               }

               stepData = {
                    ...stepData,
                    ...userDataToOverwrite,
               };
          }

          // איחוד ומניעת לולאה אינסופית
          const newFormData = { ...formData, ...stepData };
          const isDataChanged = Object.keys(newFormData).some(key => newFormData[key] !== formData[key]);

          if (isDataChanged) {
               setFormData(newFormData);
          }
     }, [currentUser, currentStep, grantDraft]);

     // ***** אין לוגיקת טיוטה/Toast ב-Cleanup *****


     const handleChange = useCallback((e) => {
          const { name, value, type, checked } = e.target;
          const newValue = type === 'checkbox' ? checked : value;
          setFormData((prev) => ({ ...prev, [name]: newValue }));
          setError("");
     }, []);

     // ***** פונקציית בדיקות התקינות המאוחדת (נשארת זהה) *****
     const validateField = (key, value) => {
          const strValue = String(value || '').trim();

          if (!strValue && key !== 'declaration') return "שדה חובה.";

          switch (key) {
               case 'tz':
                    if (!/^\d{9}$/.test(strValue)) return "תעודת זהות חייבת להכיל 9 ספרות בדיוק.";
                    break;
               case 'fullName':
               case 'bankOwnerName':
               case 'fatherName':
               case 'motherName':
                    if (!/^[\u0590-\u05FFa-zA-Z\s]+$/.test(strValue)) return "יש להזין אותיות ורווחים בלבד.";
                    break;
               case 'email':
                    if (!/\S+@\S+\.\S+/.test(strValue)) return "פורמט דוא\"ל אינו תקין.";
                    break;
               case 'phone':
                    if (!/^\d{10}$/.test(strValue)) return "מספר טלפון חייב להכיל 10 ספרות (לדוגמה: 05XXXXXXXX).";
                    break;
               case 'birthDate':
                    const today = new Date();
                    const birth = new Date(strValue);
                    if (today.getFullYear() - birth.getFullYear() < 18 || birth > today) return "חובה להיות מעל גיל 18.";
                    break;
               case 'tuition':
                    if (isNaN(Number(value)) || Number(value) <= 0) return "שכר לימוד חייב להיות מספר חיובי.";
                    break;
               case 'numOfChildren':
               case 'numOfBrothers19':
               case 'studyYears':
                    if (isNaN(Number(value)) || Number(value) < 0 || !Number.isInteger(Number(value))) return "חובה להזין מספר שלם חיובי.";
                    break;
               case 'declaration':
                    if (!value) return "חובה לאשר את ההצהרה.";
                    break;
               default:
                    break;
          }
          return null;
     };

     const FIELD_MAP = {
          1: ['tz', 'fullName', 'email', 'birthDate', 'address', 'phone'],
          2: ['fatherName', 'motherName', 'numOfChildren', 'numOfBrothers19'],
          3: ['major', 'tuition', 'studyYears'],
          4: ['bankOwnerName', 'bankOwnerTz', 'bankName', 'branchNumber', 'accountNumber'],
          5: ['declaration']
     };

     const validateCurrentStep = (data) => {
          for (const key of FIELD_MAP[currentStep]) {
               const validationError = validateField(key, data[key]);
               if (validationError) {
                    return validationError;
               }
          }
          return null;
     };

     const validateAllForm = (data) => {
          for (let step = 1; step <= totalSteps; step++) {
               for (const key of FIELD_MAP[step]) {
                    const validationError = validateField(key, data[key]);
                    if (validationError) {
                         return { error: validationError, failedStep: step, failedField: key };
                    }
               }
          }
          return null;
     };

     const nextStep = () => {
          const stepValidationError = validateCurrentStep(formData);

          if (stepValidationError) {
               setError(stepValidationError);
               return;
          }

          saveStepData(currentStep, formData);

          if (currentStep === totalSteps) {
               const fullValidation = validateAllForm(formData);

               if (fullValidation) {
                    setError(`שגיאת שליחה: ${fullValidation.error} בשדה ${fullValidation.failedField} בשלב ${fullValidation.failedStep}.`);
                    setCurrentStep(fullValidation.failedStep);
                    return;
               }

               const fullRequestData = {
                    personal: grantDraft.personal,
                    family: grantDraft.family,
                    studies: grantDraft.studies,
                    bank: grantDraft.bank,
                    declaration: formData.declaration,
                    userId: currentUser.Id
               };

               dispatch(addRequest(fullRequestData));
               dispatch(resetDraft());
               setFormData(prev => ({ ...prev, submitted: true }));
               return;
          }

          setCurrentStep((s) => s + 1);
     };

     const prevStep = () => {
          setError("");
          saveStepData(currentStep, formData);
          setCurrentStep((s) => Math.max(1, s - 1));
     };

     const goToStep = (step) => {
          // ***** מעבר חופשי ללא בדיקות תקינות *****
          setError("");
          saveStepData(currentStep, formData);
          setCurrentStep(step);
     };

     const renderStep = () => {
          const commonProps = { formData, handleChange, currentUser };
          switch (currentStep) {
               case 1: return <PersonalForm {...commonProps} />;
               case 2: return <FamilyForm {...commonProps} />;
               case 3: return <CourseForm {...commonProps} />;
               case 4: return <BankForm {...commonProps} />;
               case 5: return <Verify {...commonProps} />;
               default: return <PersonalForm {...commonProps} />;
          }
     };

     const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

     if (formData.submitted) {
          return <Apply />;
     }

     return (
          <div id="body">
               <div className="container1">
                    <div className="form-card">
                         <div className="decorative-element" aria-hidden="true"></div>
                         <div className="form-content">

                              <div className="form-header">
                                   <h1 className="form-title">FundGo</h1>
                                   <p className="form-subtitle">קח מימון- צא לדרך</p>
                              </div>

                              <div className="progress-container1" aria-hidden="true">
                                   <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
                                   </div>

                                   <div className="progress-steps">
                                        {["אישי", "משפחה", "לימודים", "בנק", "הצהרה"].map((label, i) => {
                                             const step = i + 1;
                                             const cls =
                                                  step < currentStep ? "progress-step completed"
                                                       : step === currentStep ? "progress-step active"
                                                            : "progress-step";

                                             return (
                                                  <span key={step} className={cls} data-step={step} data-number={step} onClick={() => goToStep(step)} style={{ cursor: 'pointer' }}>
                                                       {label}
                                                  </span>
                                             );
                                        })}
                                   </div>
                              </div>

                              {error && <div className="error-message active" role="alert" style={{ direction: 'rtl' }}>{error}</div>}

                              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} id="multiStepForm">

                                   {renderStep()}

                                   <div className="button-group">
                                        {currentStep > 1 && (
                                             <button type="button" className="btn-secondary" onClick={prevStep}>
                                                  חזור
                                             </button>
                                        )}

                                        <button type="submit" className="btn-primary" disabled={!currentUser.Id}>
                                             {currentStep === totalSteps ? "שלח בקשה" : "הבא"}
                                        </button>
                                   </div>
                              </form>

                         </div>
                    </div>
               </div>
          </div>
     );
};