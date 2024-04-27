import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";

export class <%= classify(name) %>Command implements ICommand {
    constructor() { }
}

@CommandHandler(<%= classify(name) %>Command)
export class <%= classify(name) %>CommandHandler implements ICommandHandler {

    public async execute(command: <%= classify(name)Command: Promise<void> { }
}