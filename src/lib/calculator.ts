import Mexp from 'math-expression-evaluator';

export class Calculator {
  #mexp = new Mexp();

  static calculate(expression: string): number {
    return new Calculator().calculate(expression);
  }

  calculate(expression: string): number {
    const lexed = this.#mexp.lex(
      expression.replace(/\s/g, '').replace(/,/g, '.'),
    );
    const postfixed = this.#mexp.toPostfix(lexed);
    return this.#mexp.postfixEval(postfixed);
  }
}
