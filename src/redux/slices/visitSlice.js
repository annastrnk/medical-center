import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://ajax.test-danit.com/api/v2/cards";

export const fetchVisits = createAsyncThunk("visits/fetchVisits", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  const response = await fetch(API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch visits");
  }

  const result = await response.json();

  return result;
});

export const createVisit = createAsyncThunk(
  "visits/createVisit",
  async (newVisitData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newVisitData),
    });

    if (!response.ok) {
      throw new Error("Failed to create visit");
    }

    return await response.json();
  }
);

export const deleteVisit = createAsyncThunk(
  "visits/deleteVisit",
  async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://ajax.test-danit.com/api/v2/cards/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete visit");
    }

    return id;
  }
);

export const updateVisit = createAsyncThunk(
  "visits/updateVisit",
  async ({ id, updatedData }) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://ajax.test-danit.com/api/v2/cards/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update visit");
    }

    return await response.json();
  }
);

const savedFilterParams = JSON.parse(localStorage.getItem("filterParams"));

const visitsSlice = createSlice({
  name: "visits",
  initialState: {
    visits: [],
    filterParams: savedFilterParams ||  {
      search: "",
      doctor: "all",
      priority: "all",
    },
    editMode:false,
    status: "idle",
    error: null,
    visitToEdit: null,
  },
  reducers: {
    setVisits(state, action) {
      state.visits = action.payload;
      state.filtered = action.payload;
    },
    setFilterParams(state, action) {
      state.filterParams = action.payload;
      localStorage.setItem("filterParams", JSON.stringify(action.payload));
    },
    setCurrentVisit(state, action) {
      state.visitToEdit = action.payload;
      state.editMode=action.payload ? true:false
    },
    clearCurrentVisit(state) {
      state.currentVisit = null;
    },
    resetEditMode(state) {
      state.visitToEdit = null;
      state.editMode = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisits.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVisits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visits = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchVisits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createVisit.fulfilled, (state, action) => {
        state.visits.unshift(action.payload);
        state.filtered.unshift(action.payload);
      })
      .addCase(deleteVisit.fulfilled, (state, action) => {
        state.visits = state.visits.filter(
          (visit) => visit.id !== action.payload
        );
        state.filtered = state.filtered.filter(
          (visit) => visit.id !== action.payload
        );
      })
      .addCase(updateVisit.fulfilled, (state, action) => {
        const updatedVisit = action.payload;
        state.visits = state.visits.map((visit) =>
          visit.id === updatedVisit.id ? updatedVisit : visit
        );
        state.filtered = state.filtered.map((visit) =>
          visit.id === updatedVisit.id ? updatedVisit : visit
        );
        state.currentVisit = null;
      });
  },
});

export const { setVisits, setFilterParams, setCurrentVisit, clearCurrentVisit } =
  visitsSlice.actions;
export default visitsSlice.reducer;
