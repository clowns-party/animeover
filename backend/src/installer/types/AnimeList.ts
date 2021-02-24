export interface AnimeList {
  data: [
    {
      _id: string;
      sources: Array<string>;
      title: string;
      type: string;
      episodes: number;
      status: string;
      animeSeason: {
        season: string;
        year: number;
      };
      picture: string;
      thumbnail: string;
      synonyms: Array<string>;
      relations: Array<string>;
      tags: Array<string>;
    }
  ];
}
