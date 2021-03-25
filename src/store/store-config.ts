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
    currentResult: [], //Det vi visar nu
    /* characters: new Map<string, RickMorty>(), //Ganska onödig atm */
}

const storeConfig: StoreOptions<RootState> = {
    state: rootState,
    mutations: {
        [UPDATE_CURRENT_RESULT](state, searchKey){
            state.currentResult = [];
            if(searchKey.value !== null){
                console.log("använt fetch")
                const result: RickMorty[] = searchKey.value;
                result.forEach((character: RickMorty) => {
                    state.currentResult.push(character)
                });
            }else{
                console.log("Hämtar från map")
                const result = state.results.get(searchKey.key)
                result?.resultIds.forEach(id => {
                    //const char = state.characters.get(id.id)
                    state.currentResult.push(id)
                })
            }
        },
/*         [MUTATION_NEW_CHARACTERS](state, results): void{
            const resultIds: string[] = [];
            const payloadTest: RickMorty[] = results.value;
           
            payloadTest.forEach(ele => {
                state.characters.set(ele.id, ele),
                resultIds.push(ele.id)
            });
            store.commit(UPDATE_CURRENT_RESULT, results);
        }, */
        [MUTATION_NEW_RESULT](state, searchResult){
            const ids = [];
            searchResult.value.forEach((element: RickMorty) => {
                ids.push(element.id)
            });
            const result = {
                searchKey: searchResult.key,
                resultIds: searchResult.value, 
                lastUpdate: new Date(),
            }
            state.results.set(searchResult.key, result),
            state.searches.push(searchResult.key),
            //store.commit(MUTATION_NEW_CHARACTERS, searchResult)
            store.commit(UPDATE_CURRENT_RESULT, searchResult)
        }
    },
    actions: {
        [ACTION_SEARCH](context, searchKey): void{
            if(context.getters.searches.indexOf(searchKey) !== -1){
                store.commit(UPDATE_CURRENT_RESULT, {value: null, key: searchKey})
            }else{
                fetch(baseUrl + searchKey)
                .then(stream => stream.json())
                .then(data => {
                    this.commit(MUTATION_NEW_RESULT, {value: data.results, key: searchKey})
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