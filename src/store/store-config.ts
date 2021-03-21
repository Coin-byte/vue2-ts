import { StoreOptions } from 'vuex';
import { RootState } from '../types/index';

const UPDATE_DATA = 'UPDATE_DATA';
const NEW_DATA = 'NEW_DATA';

const LOAD_DATA = 'LOAD_DATA';


const rootState: RootState = {
    test: [],
    hasData: false,
}

const storeConfig: StoreOptions<RootState> = {
    state: rootState,
    mutations: {
        [NEW_DATA](state, result): void{
            state.test = result;
        },
        //UPDATE_DATA(state): void{},
    },
    actions: {
        //LOAD_DATA(state): void {},
    },
    modules: {},
    getters: {
        testGetter: (state) => state.test,
    },
};

export default storeConfig;