import { LLM } from '../../index';
import { Agent, AgentBuilder } from '../../coreFunctionality/agent/Agent';
import {
  AgentLanguage,
  Goal,
  FunctionCallingLanguage,
  createGoal,
} from '../../communication/AgentLanguage';
import { ConversationMemory } from '../../coreFunctionality/agent/ConversationMemory';
import { Environment } from '../createTools/Environment';
import { ToolRegistry } from '../createTools/ToolRegistry';
import { registerFileTools } from '../createTools/toolFactory';

// ============================================================================= //
// Agent Builder
// ============================================================================= //

export function createGAMEAgent(
  language: AgentLanguage,
  goals: Goal[],
  llm: LLM
): Agent {
  const registry = new ToolRegistry({
    tags: ['file_operations', 'system'],
  });

  return new AgentBuilder()
    .withGoals(goals)
    .withLanguage(language)
    .withRegistry(registry)
    .withLLM(llm)
    .withEnvironment(new Environment())
    .verbose()
    .build();
}

// ============================================================================= //
// GAME Agent Skeleton
// ============================================================================= //

export class GAMEAgent {
  private goals: Goal[] = [];
  private readonly registry: ToolRegistry;
  private readonly memory: ConversationMemory;
  private readonly environment: Environment;
  private readonly llm: LLM;
  private language: AgentLanguage;

  constructor(config: {
    language?: AgentLanguage;
    maxIterations?: number;
    model?: string;
    workingDirectory?: string;
  } = {}) {
    this.llm = new LLM({ model: config.model });
    this.language = config.language ?? new FunctionCallingLanguage();
    this.registry = new ToolRegistry();
    this.memory = new ConversationMemory();
    this.environment = new Environment({
      workingDirectory: config.workingDirectory,
    });
  }

// ============================================================================= //
  // SubFunctions
    // ============================================================================= //

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Add a goal to the agent //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  addGoal(name: string, description: string, priority = 0): this {
    this.goals.push(createGoal(name, description, priority));
    return this;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Get the registry of the agent //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  getRegistry(): ToolRegistry {
    return this.registry;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Get the memory of the agent //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  getMemory(): ConversationMemory {
    return this.memory;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Get the environment of the agent //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  getEnvironment(): Environment {
    return this.environment;
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // Set the language of the agent //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  setLanguage(language: AgentLanguage): this {
    this.language = language;
    return this;
  }

  // ============================================================================= //
  // The llm function
  // ============================================================================= //

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // Runs the agent to achieve its goals.
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  async run(initialContext?: string): Promise<ConversationMemory> {
    console.log('\n' + '='.repeat(60));
    console.log('GAME Agent Starting');
    console.log('='.repeat(60));

    console.log('\n🎯 GOALS:');
    this.goals.forEach(g => console.log(`   [${g.priority}] ${g.name}: ${g.description}`));

    console.log('\n🔧 ACTIONS:', this.registry.getNames().join(', '));
    console.log('🌍 ENVIRONMENT:', this.environment.workingDirectory);
    console.log('💬 LANGUAGE:', this.language.constructor.name);

    const agent = new AgentBuilder()
      .withGoals(this.goals)
      .withLanguage(this.language)
      .withRegistry(this.registry)
      .withLLM(this.llm)
      .withEnvironment(this.environment)
      .verbose()
      .build();

    const userInput = initialContext ?? 'Begin working on the goals.';
    return agent.run(userInput, this.memory);
  }
}

// ============================================================================= //
// Preset factory
// ============================================================================= //

export function createFileAnalysisAgent(): GAMEAgent {
  registerFileTools();

  const agent = new GAMEAgent();

  agent
    .addGoal('discover', 'Find out what files exist in the directory', 10)
    .addGoal('analyze', 'Read and understand the package.json file', 8)
    .addGoal('summarize', 'Provide a summary of the project', 5);

  return agent;
}
