type IListener = (msg: string) => void;

interface ILoggedError {
  category: string;
  msg: string;
}

export default class Logger {
  public history: ILoggedError[] = [];
  public historyLimit = 500;

  private categories: Map<string, IListener[]> = new Map();

  constructor(categories: string[]) {
    categories.forEach(category => {
      this.categories.set(category, []);
    });
  }

  public hasCategory(category: string): boolean {
    return this.categories.has(category);
  }

  public addListener(category: string, listener: IListener): () => void {
    const foundCategory = this.findCategory(category);
    foundCategory.push(listener);
    return () => {
      const index = foundCategory.indexOf(listener);
      if (index > -1) {
        foundCategory.splice(index, 1);
      }
    };
  }

  public report(category: string, msg: string) {
    this.history.unshift({ category, msg });
    if (this.history.length > this.historyLimit) {
      this.history = this.history.slice(0, this.historyLimit);
    }

    const foundCategory = this.findCategory(category);
    foundCategory.forEach(listener => {
      listener(msg);
    });
  }

  private findCategory(category: string): IListener[] {
    const foundCategory = this.categories.get(category);
    if (!foundCategory) {
      throw new TypeError(`No category named "${category}"`);
    }
    return foundCategory;
  }
}
