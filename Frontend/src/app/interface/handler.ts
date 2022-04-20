// Authors: Timothy Carta and Victoria Gorski

// Format on how to store the logged in user's information
export interface Handler {
  data: {
    token: string;
    id: string;
    role: string;
  };
  message: string;
  status: number;
}
