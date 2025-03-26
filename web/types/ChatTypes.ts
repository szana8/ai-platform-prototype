// Define Message interface
export interface Message {
  text: string;
  sender: 'User' | 'bot';
}

// Define options interface for more flexibility
export interface ChatStreamOptions {
  url: string;
  stream?: boolean;
  method?: 'POST' | 'GET';
  headers?: Record<string, string>;
}