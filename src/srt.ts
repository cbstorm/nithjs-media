import * as path from 'path';
import { Utils } from './utils';

export interface ITimestamp {
  GetHour(): number;
  GetMinute(): number;
  GetSecond(): number;
  GetMS(): number;
}
export class Timestamp implements ITimestamp {
  private _hour: number = 0;
  private _minute: number = 0;
  private _second: number = 0;
  private _ms: number = 0;
  constructor() {}
  GetHour(): number {
    return this._hour;
  }
  GetMinute(): number {
    return this._minute;
  }
  GetSecond(): number {
    return this._second;
  }
  GetMS(): number {
    return this._ms;
  }
  From(raw: string) {
    const o = raw.split(':');
    this._hour = parseInt(o[0]) || 0;
    this._minute = parseInt(o[1]) || 0;
    const [s, ms] = (o[2] || ',').split(',');
    this._second = parseInt(s) || 0;
    this._ms = parseInt(ms) || 0;
    return this;
  }
}

export interface ISRT {
  Order(): number;
  Start(): ITimestamp;
  End(): ITimestamp;
  Content(): string;
}
export class SRT implements ISRT {
  private _order?: number;
  private _start?: ITimestamp;
  private _end?: ITimestamp;
  private _content?: string;
  constructor(order?: number, start?: ITimestamp, end?: ITimestamp, content?: string) {
    this._order = order;
    this._start = start;
    this._end = end;
    this._content = content;
  }
  Order(): number {
    return this._order || 0;
  }
  Start(): ITimestamp {
    return this._start || new Timestamp();
  }
  End(): ITimestamp {
    return this._end || new Timestamp();
  }
  Content(): string {
    return this._content || '';
  }
  From(raw: string[]) {
    const [o, sAe, ...c] = raw;
    this._order = parseInt(o);
    const [s, e] = sAe.split('-->');
    this._start = new Timestamp().From(s);
    this._end = new Timestamp().From(e);
    this._content = c.join('\n');
    return this;
  }
}

export class SRTParser {
  private _srtFilePath: string;
  constructor(srtFilePath: string) {
    this._srtFilePath = path.join(process.cwd(), srtFilePath);
  }
  async Parse() {
    const lines: SRT[] = [];
    return new Promise<SRT[]>((resolve, reject) => {
      const rli = Utils.ReadLine(this._srtFilePath);
      rli.on('close', () => {
        resolve(lines);
      });
      let raw = new Array();
      rli.on('line', (l: string) => {
        if (l == '') {
          lines.push(new SRT().From(raw));
          raw = new Array();
          return;
        }
        raw.push(l);
      });
    });
  }
}
