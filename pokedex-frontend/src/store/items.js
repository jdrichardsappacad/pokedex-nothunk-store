export const LOAD_ITEMS = 'items/LOAD_ITEMS';
export const REMOVE_ITEM = 'items/REMOVE_ITEM';
export const UPDATE_ITEM = 'items/UPDATE_ITEM';
export const ADD_ITEM = 'items/ADD_ITEM';

// action creators
const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

// functions

export const getItems = async (dispatch, id) => {
  const response = await fetch(`/api/pokemon/${id}/items`);

  if (response.ok) {
    const items = await response.json();
    dispatch(load(items, id));
  }
};

export const createItem = async (dispatch, data, pokemonId) => {
  const response = await fetch(`/api/pokemon/${pokemonId}/items`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const item = await response.json();
    dispatch(add(item));
    return item;
  }
};

export const updateItem = async (dispatch, data) => {
  const response = await fetch(`/api/items/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const item = await response.json();
    dispatch(update(item));
    return item;
  }
};

export const deleteItem = async (dispatch, itemId) => {
  const response = await fetch(`/api/items/${itemId}`, {
    method: 'delete'
  });

  if (response.ok) {
    const item = await response.json();
    dispatch(remove(item.id, item.pokemonId));
  }
};

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS: {
      const newItems = {};
      action.items.forEach((item) => {
        newItems[item.id] = item;
      });
      return {
        ...state,
        ...newItems
      };
    }
    case REMOVE_ITEM: {
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    }
    case ADD_ITEM:
    case UPDATE_ITEM: {
      return {
        ...state,
        [action.item.id]: action.item
      };
    }
    default:
      return state;
  }
};

export default itemsReducer;
