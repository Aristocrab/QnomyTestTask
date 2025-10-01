import { create } from "zustand";
import { Client } from "@/types/Client";

interface ClientsState {
  clientsInLine: Client[];
  clientInService: Client | null;
  fetchClientsInLine: () => Promise<void>;
  fetchClientInService: () => Promise<void>;
  callNextClient: () => Promise<void>;
  addClientToLine: (fullName: string) => Promise<void>;
}

export const useClientsStore = create<ClientsState>((set) => ({
  clientsInLine: [],
  clientInService: null,

  fetchClientsInLine: async () => {
    const res = await fetch("http://localhost:5263/api/Clients/getClientsInLine");
    if (res.ok) {
      const data: Client[] = await res.json();
      set({ clientsInLine: data });
    }
  },

  fetchClientInService: async () => {
    const res = await fetch("http://localhost:5263/api/Clients/getClientInService");
    if (res.ok) {
        if (res.status === 204) {
            set({ clientInService: null });
            return;
        }

      const data: Client = await res.json();
      set({ clientInService: data });
    }
  },

  callNextClient: async () => {
    const res = await fetch("http://localhost:5263/api/Clients/callNextClient", {
      method: "POST",
    });
    if (res.status === 204) {
      set({ clientInService: null });
      return;
    }
    if (!res.ok) throw new Error("Failed to call next client");

    const data: Client = await res.json();
    set((state) => ({
      clientInService: data,
      clientsInLine: state.clientsInLine.filter((c) => c.id !== data.id), // 🔥 remove from line
    }));
  },

  addClientToLine: async (fullName: string) => {
    const res = await fetch(
      `http://localhost:5263/api/Clients/addClientToLine?clientFullName=${encodeURIComponent(fullName)}`,
      { method: "POST" }
    );
    if (!res.ok) throw new Error("Failed to add client");
    const newClient: Client = await res.json();

    newClient.checkInTime = new Date(newClient.checkInTime.toString().replace("Z", ""));

    set((state) => ({
      clientsInLine: [...state.clientsInLine, newClient],
    }));
  },
}));
