import { StoreOptions } from 'vuex';
import { RootState, RickMorty } from '../types/index';

const rootState: RootState = {
    test: [],
    searchCache: new Map<string, RickMorty>(),
}

const storeConfig: StoreOptions<RootState> = {
    state: rootState,
    mutations: {},
    actions: {},
    modules: {},
    getters: {},
};

export default storeConfig;