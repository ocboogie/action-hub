import toml from "./toml";

interface ILanguages {
  [key: string]: (input: string) => object;
}

const languages: ILanguages = {
  toml
};

export default languages;
