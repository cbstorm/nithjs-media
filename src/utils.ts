import { exec } from 'child_process';
import * as fs from 'fs';
import * as readline from 'readline';
export namespace Utils {
  export async function ReadFile(filePath: string) {
    return new Promise<string>((resolve, reject) => {
      return fs.readFile(filePath, { encoding: 'utf-8' }, (err, data: string) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  }

  export function ReadLine(filePath: string): readline.Interface {
    const rs = fs.createReadStream(filePath, { encoding: 'utf-8' });
    const rli = readline.createInterface({ input: rs });
    return rli;
  }

  export async function ExecAsync(command: string) {
    console.debug(command);
    return new Promise<string>((resolve, reject) => {
      return exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(error?.message);
        }
        return resolve(stderr ? `Error: ${stderr}` : stdout);
      });
    });
  }
}
