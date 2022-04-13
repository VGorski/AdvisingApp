export interface Handler {
  data: {
    token: string;
    id: string;
    role: string;
  };
  message: string;
  status: number;
}
