export interface IMessage {
  title: string;
  description: string;
  settings?: IMsgSettings;
}
export type IListener = (msg: IMessage) => void;
export type IGlobalListener = (category: string, msg: IMessage) => void;

export interface ILoggedError {
  category: string;
  msg: IMessage;
}

export interface ILoggerObj {
  history: ILoggedError[];
  historyLimit: number;
  categories: string[];
}

export interface IMsgSettings {
  prependTitleToDescription?: boolean;
}

console.log("test");

export default class Logger {
  public static readonly defaultSettings: IMsgSettings = {
    prependTitleToDescription: true
  };

  public static fromObj(obj: ILoggerObj) {
    const logger = new this(obj.categories);
    logger.history = obj.history;
    logger.historyLimit = obj.historyLimit;
    return logger;
  }

  public static log2Console(category: string, msg: IMessage) {
    const msgToLog = msg.description
      ? msg.settings.prependTitleToDescription
        ? `${msg.title}: ${msg.description}`
        : msg.description
      : msg.title;
    switch (category) {
      case "error":
        console.error(msgToLog);
        break;
      case "info":
        console.info(msgToLog);
        break;
      case "warn":
        console.warn(msgToLog);
        break;
      default:
        console.log(msgToLog);
    }
  }

  public history: ILoggedError[] = [];
  public historyLimit = 500;

  private globalListeners: IGlobalListener[] = [];
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

  public addGlobalListener(listener: IGlobalListener): () => void {
    this.globalListeners.push(listener);
    return () => {
      const index = this.globalListeners.indexOf(listener);
      if (index > -1) {
        this.globalListeners.splice(index, 1);
      }
    };
  }

  public report(
    category: string,
    title: string,
    description?: string,
    settings?: IMsgSettings
  ) {
    const msgSettings = { ...Logger.defaultSettings, ...settings };
    const msg: IMessage = {
      title,
      description,
      settings: msgSettings
    };
    this.history.unshift({ category, msg });
    if (this.history.length > this.historyLimit) {
      this.history = this.history.slice(0, this.historyLimit);
    }

    const foundCategory = this.findCategory(category);

    this.globalListeners.forEach(listener => {
      listener(category, msg);
    });

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
