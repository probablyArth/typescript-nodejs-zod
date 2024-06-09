enum Role {
  USER,
  LLM,
}

type ConversationMessage = { role: Role; message: string };

type ConnectionDetails = {
  problem_link: string;
  conversation: ConversationMessage[];
};

const store = new Map<string, ConnectionDetails>();

export const addConnection = (id: string, details: ConnectionDetails) => {
  if (!store.has(id)) {
    store.set(id, details);
  }
};

export const deleteConnection = (id: string) => {
  if (store.has(id)) store.delete(id);
};

export const addConversation = (id: string, message: ConversationMessage) => {
  const conn = store.get(id);
  if (conn !== undefined) {
    conn.conversation.push(message);
  }
};

export const getConnection = (id: string) => store.get(id);
