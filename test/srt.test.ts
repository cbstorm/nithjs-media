import { SRTParser } from './../src/srt';
describe('srt', () => {
  it('srt parse', async () => {
    const srt = new SRTParser('.tmp/love_rosie.srt');
    const result = await srt.Parse();
    console.log(result[3]);
    expect(true).toEqual(true);
  });
});
