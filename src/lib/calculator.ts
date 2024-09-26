import { Err, Ok, Result } from '@bruhabruh/type-safe';
import Mexp from 'math-expression-evaluator';

export class Calculator {
  #mexp = new Mexp();

  static calculate(expression: string): Result<number, string> {
    return new Calculator().calculate(expression);
  }

  calculate(expression: string): Result<number, string> {
    try {
      const lexed = this.#mexp.lex(
        expression.replace(/\s/g, '').replace(/,/g, '.'),
      );
      const postfixed = this.#mexp.toPostfix(lexed);
      return Ok(this.#mexp.postfixEval(postfixed));
    } catch (e) {
      if (e instanceof Error) {
        return Err(`Fail calculate expression "${expression}": ${e.message}`);
      } else {
        return Err(`Fail calculate expression "${expression}"`);
      }
    }
  }
}
