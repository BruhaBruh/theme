type Selector = ':root' | ':root, .light' | '.dark';
type Variable = string;
type Value = string;

export type Variables = Record<Variable, Value>;

export type VariablesBySelectors = Record<Selector, Variables>;
