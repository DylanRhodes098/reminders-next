// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ─────────────────────────────────────────────────────────────────────────────
// Represents a message in an LLM conversation.
// ─────────────────────────────────────────────────────────────────────────────

// < - System = Instructions for the llm to use - > //
// ⥥
// < - User = The users request - > //
// ⥥
// < - Assistant = The llm response - > //

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// ============================================================================= //
// Message Skeleton
// ============================================================================= //

// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" //
// defines a type that only allows the follwoing strings //
// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""" //
export type Role = 'system' | 'user' | 'assistant';

// ─────────────────────────────────────────────────────────────────────────────
// Class //
// ─────────────────────────────────────────────────────────────────────────────
export class Message {
 
  // ─────────────────────────────────────────────────────────────────────────────
  // the message object has to look like //
  // ─────────────────────────────────────────────────────────────────────────────
  constructor(

    // role can only be a string of 'sysem', 'user', 'assistant', and not change //
    public readonly role: Role,

    // content can only be a string and not changed //
    public readonly content: string
  ) {}

 // ─────────────────────────────────────────────────────────────────────────────
 // Message functions //
 // ─────────────────────────────────────────────────────────────────────────────

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // A system function that belongs to the Message class //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static system(content: string): Message {

    // returns an object, role : "system", content : string //
    return new Message('system', content);
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // A user function that belongs to the Message class //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static user(content: string): Message {

    // returns an object, role : "user", content : string //
    return new Message('user', content);
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // An assistant function that belongs to the Message class //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static assistant(content: string): Message {

        // returns an object, role : "assistant", content : string //
    return new Message('assistant', content);
  }

  // ============================================================================= //
  // Serialization Functions //
  // ============================================================================= //

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // toJson function that Define how the object with role and content keys should look in json //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  toJSON(): { role: Role; content: string } {

    // This is how it should look //
    return { role: this.role, content: this.content };
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
   // a fromJson function that defines how the json should look as an object //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  static fromJSON(json: { role: Role; content: string }): Message {

    // Return the new object message using json parameters // 
    return new Message(json.role, json.content);
  }

  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  // String representation for debugging //
// a string converter function that returns a string //
  // _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- //
  toString(): string {
    const preview = this.content.substring(0, 50);
    const ellipsis = this.content.length > 50 ? '...' : '';
    return `[${this.role}]: ${preview}${ellipsis}`;
  }
}
