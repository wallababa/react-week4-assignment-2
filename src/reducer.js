import { mapValues } from './utils';

const initialState = {
  newId: 100,
  restaurant: {
    name: '',
    category: '',
    address: '',
  },
  restaurants: [],
};

const reducers = {
  addRestaurant(state) {
    const { newId, restaurant, restaurants } = state;

    return ({
      newId: newId + 1,
      restaurant: {
        ...mapValues(restaurant, () => ''),
      },
      restaurants: [
        ...restaurants,
        {
          id: newId,
          ...mapValues(restaurant, (value) => value.trim()),
        },
      ],
    });
  },
  updateRestaurant(state, action) {
    const { restaurant } = state;
    const { field, value } = action.payload;

    return ({
      ...state,
      restaurant: {
        ...restaurant,
        [field]: value,
      },
    });
  },
  default(state) {
    return state;
  },
};

export default function reducer(state = initialState, action = {}) {
  const { type } = action;

  return (reducers[type] || reducers.default)(state, action);
}
