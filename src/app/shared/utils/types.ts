export type operatorString = "dates_between" | "includes" | "starts_with" | "ends_with" | "equals" |
  "between" | "less_than" | "greater_than" | "greater_than_or_equal" |
  "less_than_or_equal" | "in"|"date_less_than" | "date_greater_than";

export interface SearchQuery {
  field: string;
  operator: operatorString;
  param: any;
}
