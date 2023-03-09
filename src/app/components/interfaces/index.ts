export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  title: string;
  url: string;
  publishedAt: Date;
  description?: string;
  urlToImage?: string;
  content?: string;
  author?: string;
}

export interface Source {
  name: string;
  id?: string;
}

export interface ArticulosPorCategoriaPag {
  [key: string]: {
    page: number;
    articulos: Article[];
  };
}
