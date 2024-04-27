import { normalize } from '@angular-devkit/core';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { ApplicationOptions } from '../application/application.schema';
import { ModuleOptions } from '../module/module.schema';
import { CommandOptions } from './command.schema';

describe('COmmand Factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  );
  it('should manage name only', async () => {
    const options: CommandOptions = {
      name: 'foo',
      skipImport: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/foo.command.ts'),
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/foo.command.spec.ts'),
    ).toBeDefined();
    expect(tree.readContent('/foo.command.ts')).toEqual(
      "import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'" +
        '\n' +
        'export class <%= classify(name) %>Command implements ICommand {\n' +
        '    constructor() { }\n' +
        '}\n' +
        '@CommandHandler(<%= classify(name) %>Command)\n' +
        'export class <%= classify(name) %>CommandHandler implements ICommandHandler {\n', +
        '\n' +
        '    public async execute(command: <%= classify(name) %>Command: Promise<void> { }\n' +
        '}',
    );
  });
  it('should manage name as a path', async () => {
    const options: CommandOptions = {
      name: 'bar/foo',
      skipImport: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/bar/foo.command.ts'),
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/bar/foo.command.spec.ts'),
    ).toBeDefined();
    expect(tree.readContent('/bar/foo.command.ts')).toEqual(
      "import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'" +
        '\n' +
        'export class <%= classify(name) %>Command implements ICommand {\n' +
        '    constructor() { }\n' +
        '}\n' +
        '@CommandHandler(<%= classify(name) %>Command)\n' +
        'export class <%= classify(name) %>CommandHandler implements ICommandHandler {\n', +
        '\n' +
        '    public async execute(command: <%= classify(name) %>Command: Promise<void> { }\n' +
        '}',
    );
  });
  it('should manage name and path', async () => {
    const options: CommandOptions = {
      name: 'foo',
      path: 'bar',
      skipImport: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/bar/foo.command.ts'),
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/bar/foo.command.spec.ts'),
    ).toBeDefined();
    expect(tree.readContent('/bar/foo.command.ts')).toEqual(
      "import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'" +
        '\n' +
        'export class <%= classify(name) %>Command implements ICommand {\n' +
        '    constructor() { }\n' +
        '}\n' +
        '@CommandHandler(<%= classify(name) %>Command)\n' +
        'export class <%= classify(name) %>CommandHandler implements ICommandHandler {\n', +
        '\n' +
        '    public async execute(command: <%= classify(name) %>Command: Promise<void> { }\n' +
        '}',
    );
  });
  it('should manage name to normalize', async () => {
    const options: CommandOptions = {
      name: 'fooBar',
      skipImport: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/foo-bar.command.ts'),
    ).toBeDefined();
    expect(tree.readContent('/foo-bar.command.ts')).toEqual(
      "import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'" +
        '\n' +
        'export class <%= classify(name) %>Command implements ICommand {\n' +
        '    constructor() { }\n' +
        '}\n' +
        '@CommandHandler(<%= classify(name) %>Command)\n' +
        'export class <%= classify(name) %>CommandHandler implements ICommandHandler {\n', +
        '\n' +
        '    public async execute(command: <%= classify(name) %>Command: Promise<void> { }\n' +
        '}',
    );
  });
  it('should manage path to normalize', async () => {
    const options: CommandOptions = {
      name: 'barBaz/foo',
      skipImport: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/bar-baz/foo.command.ts'),
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/bar-baz/foo.command.spec.ts'),
    ).toBeDefined();
    expect(tree.readContent('/bar-baz/foo.command.ts')).toEqual(
      "import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'" +
        '\n' +
        'export class <%= classify(name) %>Command implements ICommand {\n' +
        '    constructor() { }\n' +
        '}\n' +
        '@CommandHandler(<%= classify(name) %>Command)\n' +
        'export class <%= classify(name) %>CommandHandler implements ICommandHandler {\n', +
        '\n' +
        '    public async execute(command: <%= classify(name) %>Command: Promise<void> { }\n' +
        '}',
    );

  });
  it('should keep backspaces in path and file name', async () => {
    const options: CommandOptions = {
      name: '_bar/_foo',
      skipImport: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/_bar/_foo.command.ts'),
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/_bar/_foo.command.spec.ts'),
    ).toBeDefined();
    expect(tree.readContent('/_bar/_foo.command.ts')).toEqual(
      "import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'" +
        '\n' +
        'export class <%= classify(name) %>Command implements ICommand {\n' +
        '    constructor() { }\n' +
        '}\n' +
        '@CommandHandler(<%= classify(name) %>Command)\n' +
        'export class <%= classify(name) %>CommandHandler implements ICommandHandler {\n', +
        '\n' +
        '    public async execute(command: <%= classify(name) %>Command: Promise<void> { }\n' +
        '}',
    );
    
  });
  it('should manage javascript file', async () => {
    const options: CommandOptions = {
      name: 'foo',
      skipImport: true,
      language: 'js',
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;
    expect(
      files.find((filename) => filename === '/foo.command.js'),
    ).toBeDefined();
    expect(
      files.find((filename) => filename === '/foo.command.spec.js'),
    ).toBeDefined();
    expect(tree.readContent('/foo.command.js')).toEqual(
      "import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'" +
        '\n' +
        'export class <%= classify(name) %>Command implements ICommand {\n' +
        '    constructor() { }\n' +
        '}\n' +
        '@CommandHandler(<%= classify(name) %>Command)\n' +
        'export class <%= classify(name) %>CommandHandler implements ICommandHandler {\n', +
        '\n' +
        '    public async execute(command: <%= classify(name) %>Command: Promise<void> { }\n' +
        '}',
    );
  });
  it('should manage declaration in app module', async () => {
    const app: ApplicationOptions = {
      name: '',
    };
    let tree: UnitTestTree = await runner.runSchematic('application', app);

    const options: CommandOptions = {
      name: 'foo',
      flat: true,
    };
    tree = await runner.runSchematic('service', options, tree);
    expect(tree.readContent(normalize('/src/app.module.ts'))).toEqual(
      "import { Module } from '@nestjs/common';\n" +
        "import { AppController } from './app.controller';\n" +
        "import { AppService } from './app.service';\n" +
        "import { FooCommandHandler } from './foo.command';\n" +
        '\n' +
        '@Module({\n' +
        '  imports: [],\n' +
        '  controllers: [AppController],\n' +
        '  providers: [AppService, FooCommandHandler],\n' +
        '})\n' +
        'export class AppModule {}\n',
    );
  });
  it('should manage declaration in foo module', async () => {
    const app: ApplicationOptions = {
      name: '',
    };
    let tree: UnitTestTree = await runner.runSchematic('application', app);

    const module: ModuleOptions = {
      name: 'foo',
    };
    tree = await runner.runSchematic('module', module, tree);
    const options: CommandOptions = {
      name: 'foo',
      path: 'foo',
      flat: true,
    };
    tree = await runner.runSchematic('command', options, tree);
    expect(tree.readContent(normalize('/src/foo/foo.module.ts'))).toEqual(
      "import { Module } from '@nestjs/common';\n" +
        "import { FooCommandHandler } from './foo.command';\n" +
        '\n' +
        '@Module({\n' +
        '  providers: [FooCommandHandler]\n' +
        '})\n' +
        'export class FooModule {}\n',
    );
  });
  it('should create a spec file', async () => {
    const options: CommandOptions = {
      name: 'foo',
      spec: true,
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/foo.command.spec.ts'),
    ).not.toBeUndefined();
  });
  it('should create a spec file with custom file suffix', async () => {
    const options: CommandOptions = {
      name: 'foo',
      spec: true,
      specFileSuffix: 'test',
      flat: true,
    };
    const tree: UnitTestTree = await runner.runSchematic('command', options);

    const files: string[] = tree.files;

    expect(
      files.find((filename) => filename === '/foo.command.spec.ts'),
    ).toBeUndefined();
    expect(
      files.find((filename) => filename === '/foo.command.test.ts'),
    ).not.toBeUndefined();
  });
});
