export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type todoHandler = (id: number) => void;
export type todoHandlerAsync = (id: number) => Promise<void>;
