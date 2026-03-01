export interface Visitor {
  name: string;
  version: string;
  image?: string;
}

export interface VisitorResponse {
  code: number;
  description: string;
  data: Visitor;
}
