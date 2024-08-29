
export interface ApiLink {
  _id: string;
  shortUrl: string;
  originalUrl: string;
}

export type LinkMutation = Omit<ApiLink, '_id' | 'shortUrl'>;