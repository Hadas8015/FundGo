import { createSlice } from '@reduxjs/toolkit';

const initialDraftState = {
    personal: { tz: '', fullName: '', email: '', birthDate: '', address: '', phone: '' },
    family: {},
    studies: {},
    bank: {},
    declaration: false,
};

const initialState = {
    list: [],
    count: 0,
    current: {},
    grantDraft: initialDraftState, // סטייט טופס הדראפט
};

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {
        // פעולה לשמירת בקשה חדשה סופית
        add: (state, action) => {
            const newRequest = {
                ...action.payload,
                id: state.count + 1,
                status: "waiting",
            };
            state.list.push(newRequest);
            state.count += 1;
            state.current = newRequest;
            // איפוס הטיוטה לאחר שליחה
            state.grantDraft = initialDraftState;
        },

        // פעולות אישור/דחייה
        allow: (state, action) => {
            const Id = action.payload;
            const request = state.list.find(req => req.id === Id);
            if (request) { request.status = "allow"; }
        },
        reject: (state, action) => {
            const Id = action.payload;
            const request = state.list.find(req => req.id === Id);
            if (request) { request.status = "reject"; }
        },

        // ***** פעולות שמירת דראפט (GrantSlice לשעבר) *****
        savePersonal: (state, action) => { state.grantDraft.personal = action.payload; },
        saveFamily: (state, action) => { state.grantDraft.family = action.payload; },
        saveStudies: (state, action) => { state.grantDraft.studies = action.payload; },
        saveBank: (state, action) => { state.grantDraft.bank = action.payload; },
        saveDeclaration: (state, action) => { state.grantDraft.declaration = action.payload; },
        resetDraft: (state) => { state.grantDraft = initialDraftState; }
    }
})

export const {
    add,
    allow,
    reject,
    savePersonal,
    saveFamily,
    saveStudies,
    saveBank,
    saveDeclaration,
    resetDraft
} = requestSlice.actions;

// Selector לשליפת בקשות שאינן מאושרות
export const selectNotAllowed = (state) =>
    state.request.list.filter(req => req.status !== "allow" && req.status !== "reject");

export default requestSlice.reducer;