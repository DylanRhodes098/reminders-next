// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ============================================================================= //
// Imports
// ============================================================================= //

import { loadEnv, LLM, clearGlobalRegistry } from './index';
import { Goal, FunctionCallingLanguage, createGoal } from './communication/AgentLanguage';
import { createGAMEAgent } from './factory/createAgents/agentFactory';
import { registerFileTools } from './factory/createTools/toolFactory';

// ============================================================================= //
// Execute Agent
// ============================================================================= //

async function demonstrateFunctionCalling(llm: LLM): Promise<void> {
  console.log('\n' + '='.repeat(60));
  console.log('GAME Agent with FunctionCallingLanguage');
  console.log('='.repeat(60));

  console.log('\nThis uses OpenAI\'s native function calling API.');
  console.log('The LLM receives tools as structured definitions and');
  console.log('returns tool calls in a structured format.\n');

  const goals: Goal[] = [
    createGoal('discover', 'Find out what files exist in the directory', 10),
    createGoal('analyze', 'Read and understand the package.json file', 8),
    createGoal('summarize', 'Provide a summary of the project', 5),
  ];

  const agent = createGAMEAgent(
    new FunctionCallingLanguage(),
    goals,
    llm
  );

  console.log('🎯 GOALS:');
  goals.forEach(g => console.log(`   [${g.priority}] ${g.name}: ${g.description}`));

  const memory = await agent.run(
    'Analyze this project. List the files, read package.json, and summarize.'
  );

  console.log('\n📊 Final memory:', memory.length, 'items');
}

// ============================================================================= //
// The Execute function
// ============================================================================= //

async function main(): Promise<void> {
  loadEnv();

  try {
    clearGlobalRegistry();

    registerFileTools();

    const llm = new LLM();

    await demonstrateFunctionCalling(llm);

    console.log('\n' + '='.repeat(60));
    console.log('✅ GAME Framework Demo Complete');
    console.log('='.repeat(60));
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { createGAMEAgent, GAMEAgent, createFileAnalysisAgent } from './factory/createAgents/agentFactory';
export { registerFileTools } from './factory/createTools/toolFactory';
