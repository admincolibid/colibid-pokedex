export interface PokemonNameAndUrl {
  name: string;
  url: string;
}

export interface PokemonApiResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonNameAndUrl[];
}
