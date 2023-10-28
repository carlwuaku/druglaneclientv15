export type operatorString = "dates_between" | "includes" | "starts_with" | "ends_with" | "equals" |
  "between" | "less_than" | "greater_than" | "greater_than_or_equal" |
  "less_than_or_equal" | "in";

export interface SearchQuery {
  field: string;
  operator: operatorString;
  param: any;
}
