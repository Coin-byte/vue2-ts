import { StoreOptions } from 'vuex';
import { RootState, RickMorty } from '../types/index';

const UPDATE_DATA = 'UPDATE_DATA';
const NEW_DATA = 'NEW_DATA';

const LOAD_DATA = 'LOAD_DATA';


const rootState: RootState = {
    test: [],
    hasData: false,
    searchCache: new Map<string, RickMorty>(),
}

const storeConfig: StoreOptions<RootState> = {
    state: rootState,
    mutations: {
        //NEW_DATA(state): void{},
        //UPDATE_DATA(state): void{},
    },
    actions: {
        //LOAD_DATA(state): void {},
    },
    modules: {},
    getters: {
        testGetter: (state): boolean => state.hasData,
    },
};

export default storeConfig;