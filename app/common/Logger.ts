type IListener = (msg: string) => void;

interface ILoggedError {
  category: string;
  msg: string;
}

interface ILoggerObj {
  history: ILoggedError[];
  historyLimit: number;
  categories: string[];
}

export default class Logger {
  public static fromObj(obj: ILoggerObj) {
    const logger = new this(obj.categories);
    logger.history = obj.history;
    logger.historyLimit = obj.historyLimit;
    return logger;
  }

  public history: ILoggedError[] = [];
  public historyLimit = 500;

  private categories: { [key: string]: IListener[] } = Object.create(null);

  constructor(categories: string[]) {
    categories.forEach(category => {
      this.categories[category] = [];
    });
  }

  public hasCategory(category: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.categories, category);
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

  public toObj(): ILoggerObj {
    return {
      history: this.history,
      historyLimit: this.historyLimit,
      categories: Object.keys(this.categories)
    };
  }

  private findCategory(category: string): IListener[] {
    const foundCategory = this.categories[category];
    if (!foundCategory) {
      throw new TypeError(`No category named "${category}"`);
    }
    return foundCategory;
  }
}
