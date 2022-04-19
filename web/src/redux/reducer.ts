/* eslint-disable import/no-cycle */
import { EventInfo } from "../components/Card/NewCard";

export interface IUser {
  name: string,
  email: string,
  walletAddress: string,
  image: string
}

export interface IState {
  user: IUser,
events: [],
cities: [],
categories: [],
contracts: [],
filterEvents: [],
favs: EventInfo[]
};

interface IAction {
  type: string,
  payload: any 
}

const initialState: IState = {
    user: { name: "",
      email: "",
      walletAddress: "",
      image: ""},
  events: [],
  cities: [],
  categories: [],
  contracts: [],
  filterEvents: [],
  favs: []
};

// eslint-disable-next-line @typescript-eslint/default-param-last
export default function rootReducer(state: IState = initialState, action: IAction) {

  switch (action.type) {
    case "ADD_FAV": {
      const findEvent = state.favs.find(event => event.address !== action.payload.addres)
      if(!findEvent) return {...state, favs: [...state.favs, action.payload]};
      return state
    }
    case "DELETE_FAV":{
      const findEvent = state.favs.filter(event => event.address !== action.payload)
      return {...state, favs: findEvent};
    }
    case "GET_EVENTS":
      return { ...state, events: action.payload };
    case "GET_CITIES":
      return { ...state, cities: action.payload };
    case "GET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "GET_CONTRACTS":
      return { ...state, contracts: action.payload };
    case "FILTER_EVENTS":
      return { ...state, filterEvents: action.payload };

        case "GET_USER":
            return { ...state, user: action.payload };
    default:
      return state;
  }
}
