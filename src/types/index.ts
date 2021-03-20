
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

  export interface RootState {
    test: string[],
    searchCache: Map<string, RickMorty>
}