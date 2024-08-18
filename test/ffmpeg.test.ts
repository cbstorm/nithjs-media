import { Media } from '../src/media';
describe('ffmpeg', () => {
  it(
    'ToAudio',
    async () => {
      const ff = new Media('.tmp/vid0.mp4');
      await ff.ToAudio();
      expect(true).toBe(true);
    },
    60 * 1000 * 2
  );
  it('Info', async () => {
    const ff = new Media('.tmp/vid0.mp4');
    console.log(await ff.Info('.tmp/vid0.info'));
    expect(true).toBe(true);
  });
});
