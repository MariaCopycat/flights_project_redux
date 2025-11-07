import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { companiesName } from "../components/Main/FilterCompany";
import { countTransits } from "../components/Main/FilterCountTransfers";

type Time = {
  startTime: string;
  endTime: string;
};

type Flight = {
  id: number;
  price: number;
  fromto: string;
  time: Time;
  company: string;
  duration: number;
  connectionAmount: number;
};

type FlightState = {
  flights: Flight[];
  filtered: Flight[];
  loading: boolean;
error: string | null; 
};

export const fetchFlights = createAsyncThunk<
  Flight[],
  undefined,
  { rejectValue: string }
>("flights/fetchFlights", async function (_, { rejectWithValue }) {
  const res = await fetch("./flights.json");
  if (!res.ok) {
    return rejectWithValue("Server Error!");
  }
  const data = await res.json();
  return data;
});

const initialState: FlightState = {
  flights: [],
  filtered: [],
  loading: false,
	error: null,
};

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    sortTicketsCheap: (state) => {
      state.flights = state.filtered.sort((a, b) => a.price - b.price);
    },
    sortTicketsFast: (state) => {
      state.flights = state.filtered.sort((a, b) => a.duration - b.duration);
    },
    sortTicketsOptimal: (state) => {
      state.flights = state.filtered.sort(
        (a, b) => a.connectionAmount - b.connectionAmount
      );
    },
    filterTickets: (state) => {
      if (companiesName.length > 0 && countTransits.length === 0) {
        state.filtered = state.flights.filter((flight) =>
          companiesName.includes(flight.company)
        );
      } else if (companiesName.length === 0 && countTransits.length > 0) {
        state.filtered = state.flights.filter((flight) =>
          countTransits.includes(flight.connectionAmount)
        );
      } else if (companiesName.length > 0 && countTransits.length > 0) {
        state.filtered = state.flights.filter(
          (flight) =>
            countTransits.includes(flight.connectionAmount) &&
            companiesName.includes(flight.company)
        );
      } else if (companiesName.length === 0 && countTransits.length === 0) {
        state.filtered = state.flights;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFlights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFlights.fulfilled,
        (state, action: PayloadAction<Flight[]>) => {
          state.flights = action.payload;
			state.filtered = action.payload;
          state.loading = false;
        }
      );
  },
});

export const {
  sortTicketsCheap,
  sortTicketsFast,
  sortTicketsOptimal,
  filterTickets,
} = flightsSlice.actions;

export default flightsSlice.reducer;
