import { create } from "zustand";
import { Client } from "@/types/Client";
import { toast } from 'react-toastify';

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Clients/getClientsInLine`);
    if (res.ok) {
      const data: Client[] = await res.json();
      set({ clientsInLine: data });
    }
  },

  fetchClientInService: async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Clients/getClientInService`);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Clients/callNextClient`, {
      method: "POST",
    });
    if (res.status === 204) {
      set({ clientInService: null });
      return;
    }
    if (!res.ok) {
      toast.error((await res.json()).detail);
      return;
    }

    const data: Client = await res.json();
    set((state) => ({
      clientInService: data,
      clientsInLine: state.clientsInLine.filter((c) => c.id !== data.id),
    }));
  },

  addClientToLine: async (fullName: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/Clients/addClientToLine?clientFullName=${encodeURIComponent(fullName)}`,
      { method: "POST" }
    );
    if (!res.ok) {
      toast.error((await res.json()).detail);
      return;
    }
    const newClient: Client = await res.json();

    newClient.checkInTime = new Date(newClient.checkInTime.toString().replace("Z", ""));

    set((state) => ({
      clientsInLine: [...state.clientsInLine, newClient],
    }));
  },
}));
