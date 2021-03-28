import { StoreOptions } from 'vuex';
import store from '.';
import { RootState, RickMorty, SearchResult } from '../types/index';

const MUTATION_NEW_DATA = 'MUTATION_UPDATE_DATA';
const MUTATION_NEW_CHARACTERS = 'MUTATION_NEW_CHARACTERS';
const UPDATE_CURRENT_RESULT = 'UPDATE_CURRENT_RESULT';
const ACTION_SEARCH = 'ACTION_SEARCH';
const MUTATION_NEW_RESULT = 'MUTATION_NEW_RESULT';

const LOAD_DATA = 'LOAD_DATA';
//split base url and use extra strings for calls
//use one string 'character/?name=' for search
//and one string 'xyz/?'id' for single character
const baseUrl = "https://rickandmortyapi.com/api/character/?name=";


const rootState: RootState = {
    results: new Map<string, SearchResult>(), //vilka ids fick vi med vår sökning
    currentResult: [], //Det vi visar nu
    characters: new Map<string, RickMorty>() //Ganska onödig atm */
}

const storeConfig: StoreOptions<RootState> = {
    state: rootState,
    mutations: {
        [UPDATE_CURRENT_RESULT](state, searchKey){
            const result = state.results.get(searchKey.key)
            result?.resultIds.forEach(id => {
                const char = state.characters.get(id)
                if (char != undefined) {
                    state.currentResult.push(char);
                }
            })
        },
        [MUTATION_NEW_RESULT](state, {key, result}){
            //CALL SPECIFIC MUTATIONS INSTEAD
            const data = result as RickMorty[]
            data.forEach(newRickMorty => state.characters.set(newRickMorty.id, newRickMorty));

            const newResult = {
                searchKey: key,
                resultIds: data.map(item => item.id), 
                lastUpdate: new Date(),
            };
            state.results.set(key, newResult);

            store.commit(UPDATE_CURRENT_RESULT, data)
        },
        //MUTATION_NEW_CHAR
        //MUTATION_UPDATE_CHAR
        //MUTATION_UPDATE_CHAR_MULTI
        //MUTATION_NEW RESULT
    },
    actions: {
        [ACTION_SEARCH](context, searchKey): void {
            const existingResult: SearchResult = context.getters.results.get(searchKey)
            //check existing
            if (existingResult != undefined) {
                //show existing
                // const result: RickMorty[] = existingCharacters.filter
                // store.commit(UPDATE_CURRENT_RESULT, {value: result, key: searchKey})

                //check if data is up to date, else continue with fetch/update 
                if (existingResult.lastUpdate.getMilliseconds() + 60000 < new Date().getMilliseconds()) {
                    return
                }
                //show data age to user?
                //notice if an update has happened? fetch != existing?
            }
            
            fetch(baseUrl + searchKey)
            .then(stream => stream.json())
            .then(data => {
                try {
                    console.log(data)
                    const result: RickMorty[] = data.result as RickMorty[]   
                    this.commit(MUTATION_NEW_RESULT, {searchKey, result})                     
                } catch (error) {
                    //show error message to user
                    console.error(error);
                    return
                }
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
        results: (state) => state.results,  
        //allCharacters
        //singleChar(id)
        //multiChar(id)
    },
};

export default storeConfig;