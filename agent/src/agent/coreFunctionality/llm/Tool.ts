// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ─────────────────────────────────────────────────────────────────────────────
// Represents the Additional tools the AI can use
// ─────────────────────────────────────────────────────────────────────────────

// ========================================== //
// UseCase //
// ========================================== //

// < - Tool Skeleton = Core deinetions (classes, interfaces) and infastructure (objects, arrays) to be used throughout the file - > //
// ⥥
// < - Tool Function = Function to create the tool object - > //
// ⥥
// < - Serialization Functions  = Functions that convert the tool to and from JSON - > //


// ========================================== //
// Paramterer Interface //
// ========================================== //

// < - properties = Are things (can be tools, data whatever) the ai must have for the tool to run, such as a piece of data, a path url, whatever - > //

// < - enum = Defines what the data type of the tools must be (such as json, text etc) - > //

// < - required = A List of the properties provided that the AI must have for the tool to run - > //

// < - [key: string]: = catches ay extra information to help out the ai - > //

// ========================================== //
// Tool Class //
// ========================================== //

// < - Tags = Organises tools for organisation. Like labels in trello, its just a luxury feature - > //

// < - Terminal = Tells the AI when to stop running, like a red light green light. usually stops after it send the response - > //

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ============================================================================= //
// Tool Skeleton
// ============================================================================= //

// ─────────────────────────────────────────────────────────────────────────────
// Interface funciton to define an object //
// ─────────────────────────────────────────────────────────────────────────────
export interface ToolParameters {

  // key 1 is type with value 'object' //
    type: 'object';
  
    // key 2 is an object called properties with 3 key values //
    // the parent key is a string //
    properties: Record<string, {
  
    // key 1 is called type, and the value is a string //
      type: string;
  
      // key 2 is optional, called description, and the value is a string //
      description?: string;
  
      // key 3 is called enum, and the value is an array //
      enum?: string[];
    }>;
  
    // key 3 is optional called required, with an an array value //
    required?: string[];
  
    // key 4 is an an index object, the key can be a string //
    [key: string]:
  
    // the value can be anything //
    unknown;  // Index signature for OpenAI compatibility
  }

// ─────────────────────────────────────────────────────────────────────────────
  // Define a tool class //
// ─────────────────────────────────────────────────────────────────────────────
export class Tool {
 
  // ─────────────────────────────────────────────────────────────────────────────
  // Constructor //
  // ─────────────────────────────────────────────────────────────────────────────
  constructor(

    // Name of the tool
    public readonly name: string,

     // Description of the tool
    public readonly description: string,

     // Parameters of the tool
    public readonly parameters: ToolParameters = 
    
    // where type is 'object' and properties is an empty object  //
    { type: 'object', properties: {} },

     // terminal can not be edited and starts as a false boolean // 
    public readonly terminal: boolean = false,

     // Tags can not be edited ann strats as an empty array // 
    public readonly tags: string[] = []
  ) {}

// ============================================================================= //
// Tool functions //
// ============================================================================= //

// Tool functions //

  // ########################################################################### //
  // a listfiles function where description key has a defined string //
  // ########################################################################### //
  static listFiles(description = 'Lists all files in the current directory'): 
  
  // Use the tool object //
  Tool {

// return a new tool object where... // 
    return new Tool(

      // name is 'listFiles'//
      'listFiles', 

      // description is the parameter //
      description, 

      // toolParameter //
      {

        // type is 'object' //
      type: 'object',

      // porperties is an empty object //
      properties: {},

      // required is an emptry array //
      required: [],
    });
  }

  // ########################################################################### //
  /** Creates a tool for reading file contents */
  // ########################################################################### //
  static readFile(description = 'Reads the contents of a file'): Tool {
    return new Tool('readFile', description, {
      type: 'object',
      properties: {
        fileName: {
          type: 'string',
          description: 'The name of the file to read',
        },
      },
      required: ['fileName'],
    });
  }

  // ########################################################################### //
    // a terminate function where description key has a defined string //
  // ########################################################################### //
  static terminate(description = 'Ends the conversation and provides final output to user'): 
  
  Tool {

    return new Tool(
      'terminate', 
      description, 
      {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          description: 'Final message to display to the user',
        },
      },

      required: ['message'],
    });
  }

   // ============================================================================= //
  // Serialization Functions //
  // ============================================================================= //

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  /** Converts to a plain object for JSON serialization */
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  toJSON(): { name: string; description: string; parameters: ToolParameters } {
    return {
      name: this.name,
      description: this.description,
      parameters: this.parameters,
    };
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  /**
   * Creates a Tool from a JSON object.
   * Accepts both { name, ... } and { toolName, ... } formats.
   */
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static fromJSON(json: {
    name?: string;
    toolName?: string;
    description: string;
    parameters?: ToolParameters;
  }): Tool {
    const name = json.name ?? json.toolName;
    // !!!!!!!!!!!!!! //
    // !!!!!!!!!!!!!! //
    if (!name) {
      throw new Error('Tool JSON must have "name" or "toolName" field');
    }
    return new Tool(
      name,
      json.description,
      json.parameters ?? { type: 'object', properties: {} }
    );
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  /**
   * Creates a Tool from a JSON string.
   * @param jsonString - JSON string containing tool definition
   */
 // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static parse(jsonString: string): Tool {
    const json = JSON.parse(jsonString);
    return Tool.fromJSON(json);
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  /** String representation for debugging */
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  toString(): string {
    return `Tool(${this.name}: ${this.description})`;
  }
}
