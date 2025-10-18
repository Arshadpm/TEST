import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Country {
  name: string;
  region: string;
  flag: string;
}

interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  selectedRegion: string;
}

const initialState: CountriesState = {
  countries: [],
  filteredCountries: [],
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 8,
  selectedRegion: "",
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get(
      "https://restcountries.com/v2/all?fields=name,region,flag"
    );
    return response.data;
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    filterByRegion: (state, action: PayloadAction<string>) => {
      state.selectedRegion = action.payload;
      state.currentPage = 1;
      if (action.payload === "") {
        state.filteredCountries = state.countries;
      } else {
        state.filteredCountries = state.countries.filter(
          (country) => country.region === action.payload
        );
      }
    },
    loadMore: (state) => {
      state.currentPage += 1;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.filteredCountries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch countries";
      });
  },
});

export const { filterByRegion, loadMore, resetPagination } =
  countriesSlice.actions;
export default countriesSlice.reducer;
