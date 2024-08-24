export interface CustomModel<T> {
  page: number;
  results: T;
  total_pages: number;
  total_results: number;
}
