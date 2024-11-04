// utilities functions interfaces
declare interface formUrlQueryParams {
  params: string;
  query: Record<string, string>;
  extraRoute?: string;
}

declare interface ShowToastParams {
  title: string;
  description: string;
}

declare interface HandleKeyDownParams {
  event: React.KeyboardEvent<HTMLInputElement>;
  func: () => void;
}