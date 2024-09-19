// utilities functions interfaces
declare interface formUrlQueryParams {
  params: string;
  query: Record<string, string>;
  extraRoute?: string;
}