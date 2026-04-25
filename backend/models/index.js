// Import libararies //
import sequelize from "../lib/db.js";
import { DataTypes } from "sequelize";

// Import model files //

import User from "./SaaS/ui/user.js";
import List from "./SaaS/ui/list.js";
import Folder from "./SaaS/ui/folder.js";
import SubLists from "./SaaS/ui/subLists.js";
import AgentFolder from "./SaaS/ui/agentFolder.js";
import AgentSubFolder from "./SaaS/ui/agentSubFolder.js";
import ReminderFolder from "./SaaS/ui/reminderFolder.js";
import Reminders from "./SaaS/ui/reminders.js";

import Agent from "./AI/agent/agent.js";
import AgentRun from "./AI/agent/agentRun.js";
import AgentError from "./AI/agent/agentError.js";
import Goal from "./AI/agent/goal.js";
import LLMClientConfig from "./AI/llm/llmClientConfig.js";
import Memory from "./AI/agent/memory.js";
import Message from "./AI/agent/message.js";
import Policy from "./AI/tools/policy.js";
import Prompt from "./AI/communication/prompt.js";
import RunStep from "./AI/communication/runStep.js";
import Tool from "./AI/tools/tool.js";
import ToolCall from "./AI/tools/toolCall.js";
import ToolRegistry from "./AI/tools/toolRegistry.js";
import ToolResult from "./AI/tools/toolResult.js";
import UsageMetrics from "./AI/llm/usageMetrics.js";


console.log("[models] registered:", Object.keys(sequelize.models));

// Create hasmany relationships //
if (!User.associations?.folders) 
    User.hasMany(Folder, {
    foreignKey: 'userId',
    as: 'folders'
});

if (!Folder.associations?.subLists) 
    Folder.hasMany(SubLists, {
    foreignKey: 'folderId',
    as: 'subLists'
});

if (!User.associations?.agentFolders)
    User.hasMany(AgentFolder, {
    foreignKey: 'userId',
    as: 'agentFolders'
});

if (!AgentFolder.associations?.agentSubFolders)
    AgentFolder.hasMany(AgentSubFolder, {
    foreignKey: 'agentFolderId',
    as: 'agentSubFolders'
});

if (!SubLists.associations?.reminders) 
    SubLists.hasMany(Reminders, {
    foreignKey: 'subListId',
    as: 'reminders'
});

if (!User.associations?.reminderFolders) 
    User.hasMany(ReminderFolder, {
    foreignKey: 'userId',
    as: 'reminderFolders'
});

if (!SubLists.associations?.reminderFolders) 
    SubLists.hasMany(ReminderFolder, {
    foreignKey: 'subListId',
    as: 'reminderFolders'
});

if (!ReminderFolder.associations?.reminders) 
    ReminderFolder.hasMany(Reminders, {
    foreignKey: 'reminderFolderId',
    as: 'reminders'
});


// Create belongsto relationships //
if (!Folder.associations?.user)
    Folder.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });
  
  // SubLists belongs to Folder
  if (!SubLists.associations?.folder)
    SubLists.belongsTo(Folder, {
      foreignKey: 'folderId',
      as: 'folder',
    });

  if (!AgentFolder.associations?.user)
    AgentFolder.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });

  if (!AgentSubFolder.associations?.agentFolder)
    AgentSubFolder.belongsTo(AgentFolder, {
      foreignKey: 'agentFolderId',
      as: 'agentFolder',
    });
  
  // Reminders belongs to SubLists
  if (!Reminders.associations?.subList)
    Reminders.belongsTo(SubLists, {
      foreignKey: 'subListId',
      as: 'subList',
    });

  // ReminderFolder belongs to User
  if (!ReminderFolder.associations?.user)
    ReminderFolder.belongsTo(User, {
      foreignKey: 'userId',
      as: 'user',
    });

  // ReminderFolder belongs to SubLists
  if (!ReminderFolder.associations?.subList)
    ReminderFolder.belongsTo(SubLists, {
      foreignKey: 'subListId',
      as: 'subList',
    });

  // Reminders belongs to ReminderFolder
  if (!Reminders.associations?.reminderFolder)
    Reminders.belongsTo(ReminderFolder, {
      foreignKey: 'reminderFolderId',
      as: 'reminderFolder',
    });

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// AI Associations
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// Agent hasMany AgentRun
if (!Agent.associations?.runs)
  Agent.hasMany(AgentRun, {
    foreignKey: "agentId",
    as: "runs",
  });

// AgentRun belongsTo Agent
if (!AgentRun.associations?.agent)
  AgentRun.belongsTo(Agent, {
    foreignKey: "agentId",
    as: "agent",
  });

// AgentRun hasMany RunStep
if (!AgentRun.associations?.steps)
  AgentRun.hasMany(RunStep, {
    foreignKey: "runId",
    as: "steps",
  });

// RunStep belongsTo AgentRun
if (!RunStep.associations?.run)
  RunStep.belongsTo(AgentRun, {
    foreignKey: "runId",
    as: "run",
  });

// AgentRun hasMany Message
if (!AgentRun.associations?.messages)
  AgentRun.hasMany(Message, {
    foreignKey: "runId",
    as: "messages",
  });

// Message belongsTo AgentRun
if (!Message.associations?.run)
  Message.belongsTo(AgentRun, {
    foreignKey: "runId",
    as: "run",
  });

// AgentRun hasMany ToolCall
if (!AgentRun.associations?.toolCalls)
  AgentRun.hasMany(ToolCall, {
    foreignKey: "runId",
    as: "toolCalls",
  });

// ToolCall belongsTo AgentRun
if (!ToolCall.associations?.run)
  ToolCall.belongsTo(AgentRun, {
    foreignKey: "runId",
    as: "run",
  });

// ToolCall hasOne ToolResult
if (!ToolCall.associations?.result)
  ToolCall.hasOne(ToolResult, {
    foreignKey: "toolCallId",
    as: "result",
  });

// ToolResult belongsTo ToolCall
if (!ToolResult.associations?.toolCall)
  ToolResult.belongsTo(ToolCall, {
    foreignKey: "toolCallId",
    as: "toolCall",
  });

// Message belongsTo ToolCall (when a message references a tool call)
if (!Message.associations?.toolCall)
  Message.belongsTo(ToolCall, {
    foreignKey: "toolCallId",
    as: "toolCall",
  });

// ToolCall hasMany Message (messages that reference a tool call)
if (!ToolCall.associations?.messages)
  ToolCall.hasMany(Message, {
    foreignKey: "toolCallId",
    as: "messages",
  });

// ToolCall belongsTo Message (the message that requested it)
if (!ToolCall.associations?.requestedByMessage)
  ToolCall.belongsTo(Message, {
    foreignKey: "requestedByMessageId",
    as: "requestedByMessage",
  });

// Message hasMany ToolCall (tool calls requested by this message)
if (!Message.associations?.requestedToolCalls)
  Message.hasMany(ToolCall, {
    foreignKey: "requestedByMessageId",
    as: "requestedToolCalls",
  });

      export {
        User,
        Folder,
        List,
        SubLists,
        AgentFolder,
        AgentSubFolder,
        Reminders,
        ReminderFolder,
        Agent,
        AgentRun,
        AgentError,
        Goal,
        LLMClientConfig,
        Memory,
        Message,
        Policy,
        Prompt,
        RunStep,
        Tool,
        ToolCall,
        ToolRegistry,
        ToolResult,
        UsageMetrics,
      };
