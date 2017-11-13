import languages from "./languages/index";

export default function(input: string, type: string): object {
  if (!Object.prototype.hasOwnProperty.call(languages, type)) {
    throw TypeError(`${type} unknown language type.`);
  }
  const parser: (input: string) => object = languages[type];
  return parser(input);
}
