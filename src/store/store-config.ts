import { StoreOptions } from 'vuex';
import store from '.';
import { RootState, RickMorty, SearchResult } from '../types/index';

// const MUTATION_NEW_DATA = 'MUTATION_UPDATE_DATA';
// const MUTATION_NEW_CHARACTERS = 'MUTATION_NEW_CHARACTERS';
const UPDATE_CURRENT_RESULT = 'UPDATE_CURRENT_RESULT';
const ACTION_SEARCH = 'ACTION_SEARCH';
const MUTATION_NEW_RESULT = 'MUTATION_NEW_RESULT';


//split base url and use extra strings for calls
//use one string 'character/?name=' for search
//and one string 'xyz/?'id' for single character
const BASE_URL = "https://rickandmortyapi.com/api/";
const API_SEARCH = "character/?name=";
const API_CHARACTER = "character/?id="
//const API_OTHER_ROUTE


const rootState: RootState = {
    results: new Map<string, SearchResult>(), //vilka ids fick vi med vår sökning
    searchHistory: [], //sökhistorik
    currentResult: [], //Det vi visar nu
    characters: new Map<string, RickMorty>(),
}

const storeConfig: StoreOptions<RootState> = {
    state: rootState,
    mutations: {
        [UPDATE_CURRENT_RESULT](state, characters: RickMorty[]) {
            state.currentResult = characters
        },
        [MUTATION_NEW_RESULT](state, {searchKey, result}) {
            const data = result as RickMorty[]
            data.forEach(newRickMorty => state.characters.set(newRickMorty.id, newRickMorty));

            const newSearchResult = {
                searchKey: searchKey,
                resultIds: data.map(item => item.id), 
                lastUpdate: new Date(),
            };
            state.results.set(searchKey, newSearchResult);
            
            if(!state.searchHistory.includes(newSearchResult.searchKey)){
                state.searchHistory.push(newSearchResult.searchKey);
            }
            store.commit(UPDATE_CURRENT_RESULT, data)
        },
    },
    actions: {
        [ACTION_SEARCH](context, searchKey): void {
            const existingResult: SearchResult = context.getters.results.get(searchKey) //osäker om getter eller state??           
            if (existingResult != undefined) {
                //show existing
                const existingCharacters: RickMorty[] = context.getters.characters(existingResult.resultIds)
                context.commit(UPDATE_CURRENT_RESULT, existingCharacters)

                //check if data is 'up to date', 60 seconds, else continue with fetch/update 
                const now = new Date().valueOf()
                const limit = existingResult.lastUpdate.valueOf()+10000
                if (limit > now) {
                    console.log("NO UPDATE")
                    console.log("Left til update: ", now-limit + "ms");
                    return
                }
                console.log("UPDATE")
                //show data age to user?
                //notice if an update has happened? fetch != existing?
            }

            fetch(BASE_URL + API_SEARCH + searchKey)
            .then(response => {
                if(!response.ok){
                    console.log(response.status)
                }
                return response.json()
            })
            .then(data => {
                    const result: RickMorty[] = data.results as RickMorty[]
                    this.commit(MUTATION_NEW_RESULT, {searchKey, result})                     
            })
            .catch(error => {
                //show error message to user
                console.error(error);
            })
        }
        
    },
    modules: {},
    getters: {
        currentResult: (state) => state.currentResult,
        searchHistory: (state) => state.searchHistory,
        results: (state) => state.results,  
        allCharacters: (state) => state.characters,
        character: (state) => (id: string): RickMorty | undefined => state.characters.get(id),
        characters: (state) => (ids: string[]): RickMorty[] => {
            const result: RickMorty[] = []
            ids.forEach(id => {
                const rickMorty = state.characters.get(id)
                if (rickMorty != undefined) {
                    result.push(rickMorty)
                }
            })
            return result
        },
    },
};

export default storeConfig;