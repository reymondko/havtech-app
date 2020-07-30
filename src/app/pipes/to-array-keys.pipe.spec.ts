import { ToArrayKeysPipe } from './to-array-keys.pipe';

describe('ToArrayKeysPipe', () => {
  it('create an instance', () => {
    const pipe = new ToArrayKeysPipe();
    expect(pipe).toBeTruthy();
  });
});
