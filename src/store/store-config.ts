import { StoreOptions } from 'vuex';
import store from '.';
import { RootState, RickMorty, SearchResult } from '../types/index';

const MUTATION_UPDATE_DATA = 'MUTATION_UPDATE_DATA';
const MUTATION_NEW_CHARACTERS = 'MUTATION_NEW_CHARACTERS';
const UPDATE_CURRENT_RESULT = 'UPDATE_CURRENT_RESULT';
const ACTION_SEARCH = 'ACTION_SEARCH';
const MUTATION_NEW_RESULT = 'MUTATION_NEW_RESULT';

const LOAD_DATA = 'LOAD_DATA';
const baseUrl = "https://rickandmortyapi.com/api/character/?name=";


const rootState: RootState = {
    searches: [], //"sökhistorik"
    results: new Map<string, SearchResult>(), //vilka ids fick vi med vår sökning
    hasData: false,
    currentResult: [], //Det vi visar nu
    characters: new Map<string, RickMorty>(), //Lagringen av karaktärer
}

const storeConfig: StoreOptions<RootState> = {
    state: rootState,
    mutations: {
        [UPDATE_CURRENT_RESULT](state, searchKey: string){
            state.currentResult = [];
            const result = state.results.get(searchKey) as SearchResult;
            result?.resultIds.forEach(id => {
                const character = state.characters.get(id) as RickMorty;
                if(character !== null){
                    state.currentResult.push(character)
                }
            })
        },
        [MUTATION_NEW_CHARACTERS](state, results: []): void{
            const resultIds: string[] = [];
            results.forEach(result => {
                state.characters.set(result['id'], result as RickMorty),
                resultIds.push(result['id'])
            });
            store.commit(UPDATE_CURRENT_RESULT, resultIds);
        },
        [MUTATION_NEW_RESULT](state, searchResult){
            const ids = [];
            searchResult.value.forEach(element => {
                ids.push(element)
            });
            const result = { 
                searchKey: searchResult.key,
                resultIds: searchResult.value,
                lastUpdate: new Date(),
            }
            state.results.set(searchResult.key, result),
            state.searches.push(searchResult.key),
            store.commit(MUTATION_NEW_CHARACTERS, searchResult.value)
        }
    },
    actions: {
        [ACTION_SEARCH](context, searchKey): void{
            console.log(context.state.searches.indexOf(searchKey))
            console.log(context.getters.searches)
            if(context.getters.searches.indexOf(searchKey) !== -1){
                //hämta searchResult, kommita ids till UPDATE_CURRENT_RESULTS
                return
            }else{
                fetch(baseUrl + searchKey)
                .then(stream => stream.json())
                .then(data => {
                    const result = { 
                        searchKey: searchKey,
                        resultIds: searchResult.value,
                        lastUpdate: new Date(),
                    }
                    this.commit(MUTATION_NEW_CHARACTERS, {value: data.results, key: searchKey})
                })
            .catch(error => console.error(error));
            }
        }
    },
    modules: {},
    getters: {
        currentResult: (state) => state.currentResult,
        searches: (state) => state.searches,
    },
};

export default storeConfig;