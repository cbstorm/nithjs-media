import * as path from 'path';
import { Utils } from './utils';
export class Media {
  private _path: string;
  private _defaultOut: string;
  constructor(filePath: string) {
    this._path = path.join(process.cwd(), filePath);
    this._defaultOut = path.join(
      path.dirname(this._path),
      path.basename(this._path).replace(path.extname(this._path), '')
    );
  }
  async Info(outPath: string) {
    const commandBuilder = new FFprobeCommandBuilder().Input(this._path);
    const res = await Utils.ExecAsync(commandBuilder.Build());
    console.log(res);
  }
  async ToAudio(inp?: { outPath?: string; timeStart?: number; duration?: number }) {
    const commandBuilder = new FFmpegCommandBuilder()
      .Input(this._path)
      .Audio()
      .Output(inp?.outPath || this._defaultOut)
      .OutputExt(inp?.outPath ? '' : '.mp3')
      .Y();
    if (inp?.timeStart) {
      commandBuilder.TimeStart(inp?.timeStart);
    }
    if (inp?.duration) {
      commandBuilder.Duration(inp?.duration);
    }
    await Utils.ExecAsync(commandBuilder.Build());
  }
}

class FFmpegCommandBuilder {
  private _bin: string = 'ffmpeg';
  private _input: string = '';
  private _output: string = '';
  private _outExt: string = '';
  private _y: boolean = false;
  private _audio: string = '';
  private _time_start: string = '';
  private _duration: string = '';
  private _info: string = '';
  Input(input: string) {
    this._input = `-i ${input}`;
    return this;
  }
  Output(output: string) {
    this._output = output;
    return this;
  }
  OutputExt(ext: string) {
    this._outExt = ext;
    return this;
  }
  TimeStart(t: number) {
    this._time_start = `-ss ${t}`;
    return this;
  }
  Duration(t: number) {
    this._duration = `-t ${t}`;
    return this;
  }
  Y() {
    this._y = true;
    return this;
  }
  Audio() {
    this._audio = '-map 0:a';
    return this;
  }
  Build() {
    this._output = `${this._output}${this._outExt}`;
    const y = this._y ? '-y' : '';
    return [this._bin, this._input, this._audio, this._time_start, this._duration, this._info, y, this._output]
      .filter(Boolean)
      .join(' ');
  }
}

class FFprobeCommandBuilder {
  private _bin: string = 'ffprobe';
  private _input: string = '';
  constructor() {}
  Input(input: string) {
    this._input = input;
    return this;
  }
  Build() {
    return [this._bin, '-loglevel 0', '-print_format json', '-show_format', '-show_streams', this._input]
      .filter(Boolean)
      .join(' ');
  }
}
