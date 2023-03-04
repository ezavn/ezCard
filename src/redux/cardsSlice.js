import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

//Entity Adapter
const cardsAdapter = createEntityAdapter({
  selectId: (entity) => entity._id,
  sortComparer: (a, b) => b._id.toString().localeCompare(a._id.toString()),
});

//Slice -> Reducers
const cardsSlice = createSlice({
  name: "cards",
  initialState: cardsAdapter.getInitialState({
    status: "idle",
    error: "",
    search: "",
  }),
  reducers: {
    searchCards: (state, action) => {
      state.search = action.payload;
    },
    //realtime
    updateCard: (state, action) => {
      //action -> card naof vua thay doi va thay doi cai gi
      //update State
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        const entries = action.payload;
        cardsAdapter.setAll(state, entries);
        state.status = "idle";
        state.error = "";
      })
      .addCase(insertCard.fulfilled, (state, action) => {
        const entity = action.payload;
        cardsAdapter.addOne(state, entity);
        state.status = "idle";
        state.error = "";
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        const id = action.payload;
        cardsAdapter.removeOne(state, id);
        state.status = "idle";
        state.error = "";
      })
      .addCase(deleteCards.fulfilled, (state, action) => {
        const { ids } = action.payload;
        cardsAdapter.removeMany(state, ids);
        state.status = "idle";
        state.error = "";
      })
      .addCase(updateCards.fulfilled, (state, action) => {
        const { ids, update } = action.payload;
        for (const index in ids) {
          cardsAdapter.updateOne(state, {
            id: ids[index],
            changes: update,
          });
        }
        state.status = "idle";
        state.error = "";
      })
      .addCase(updateCard.fulfilled, (state, action) => {
        const { id, update } = action.payload;
        cardsAdapter.updateOne(state, {
          id,
          changes: update,
        });
        state.status = "idle";
        state.error = "";
      });
  },
});
export const { searchCards } = cardsSlice.actions;

//Thunk Action

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (payload, { rejectWithValue }) => {
    const { mongo, user } = payload;
    try {
      const entries = await mongo
        .db("ecard")
        .collection("cards")
        .aggregate([
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $match: {
              owner: user.id,
            },
          },
        ]);
      //axios
      return entries;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const insertCard = createAsyncThunk(
  "cards/insertCard",
  async (payload, { rejectWithValue }) => {
    const { mongo, entity, user } = payload;
    try {
      const { insertedId } = await mongo
        .db("ecard")
        .collection("cards")
        .insertOne({ ...entity, owner: user.id });
      return {
        ...entity,
        _id: insertedId,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (payload, { rejectWithValue }) => {
    const { id, mongo, update } = payload;
    try {
      await mongo.db("ecard").collection("cards").updateOne(
        {
          _id: id,
        },
        {
          $set: update,
        }
      );
      return {
        id,
        update,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const updateCards = createAsyncThunk(
  "cards/updateCards",
  async (payload, { rejectWithValue }) => {
    const { ids, mongo, update } = payload;
    try {
      await mongo
        .db("ecard")
        .collection("cards")
        .updateMany(
          {
            _id: {
              $in: ids,
            },
          },
          {
            $set: update,
          }
        );
      return {
        ids: ids,
        update,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async (payload, { rejectWithValue }) => {
    const { mongo, id } = payload;
    try {
      await mongo.db("ecard").collection("cards").deleteOne({ _id: id });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCards = createAsyncThunk(
  "cards/deleteCards",
  async (payload, { rejectWithValue }) => {
    const { mongo, ids } = payload;
    try {
      await mongo
        .db("ecard")
        .collection("cards")
        .deleteMany({
          _id: {
            $in: ids,
          },
        });
      return {
        ids: ids,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Selector
const cardsSelectors = cardsAdapter.getSelectors((state) => state.cards);
export const selectCards = (state) => cardsSelectors.selectAll(state);

export default cardsSlice;
