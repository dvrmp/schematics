import { <%= classify(name) %>Command } from './<%= name %>.command';

describe('<%= classify(name) %>Command', () => {
  it('should be defined', () => {
    expect(new <%= classify(name) %>Command()).toBeDefined();
  });
});

describe('<%= classify(name) %>CommandHandler', () => {
  it('should be defined', () => {
    expect(new <%= classify(name) %>CommandHandler()).toBeDefined();
  });
});
