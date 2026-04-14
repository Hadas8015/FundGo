import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [{ fullName: "ציבי והדס", Id: "215967449", email: "manager@gmail.com" }],
    current: {},
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        add: (state, action) => {
            // const navigate = useNavigate();
            const newUser = action.payload;
            //SOME= בודק אם יש לפחות פריט אחד במערך שעונה על התנאי
            const userExists = state.list.some((user) => user.Id === newUser.Id);
            //             const userExists = state.list.some(
            //     user => state.current && state.current.Id && user.Id === state.current.Id
            // );

            if (!userExists) {
                state.list.push(newUser);
                state.current = newUser;
            }
            // else {
            //     // navigate("/SignUp");
            //     <Link to="/SignUp"></Link>
            // }
        },
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
    },
});

export const { add, setCurrent } = userSlice.actions;
export default userSlice.reducer;