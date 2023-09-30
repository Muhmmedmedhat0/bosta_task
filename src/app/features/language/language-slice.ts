
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  currentLanguage: string;
  direction: 'ltr' | 'rtl';
}

const initialState: LanguageState = {
  currentLanguage: 'ENG', // Default language (English)
  direction: 'ltr',     // Default direction (LTR)
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      state.direction = action.payload === 'العربية' ? 'rtl' : 'ltr';
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
