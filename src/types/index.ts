export interface RickMorty {
    id: string,
    name: string, 
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string,
    },
    location: {
        name: string,
        url: string,
    },
    image: string,
    episode: string[],
    url: string,
    created: String,
  }

export interface SearchResult {
    searchKey: string,
    resultIds: string[],
    lastUpdate: Date,
}


  export interface RootState {
    searchHistory: SearchResult[],
    results: Map<string, SearchResult>
    currentResult: RickMorty[],
    characters: Map<string, RickMorty>,
}

