import { FFmpeg } from './../src/ffmpeg';
describe('ffmpeg', () => {
  it(
    'ToAudio',
    async () => {
      const ff = new FFmpeg('.tmp/vid0.mp4');
      await ff.ToAudio();
      expect(true).toBe(true);
    },
    60 * 1000 * 2
  );
  it('Info', async () => {
    const ff = new FFmpeg('.tmp/vid0.mp4');
    console.log(await ff.Info('.tmp/vid0.info'));
    expect(true).toBe(true);
  });
});
