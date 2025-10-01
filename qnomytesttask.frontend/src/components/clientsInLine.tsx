import { useClientsStore } from "@/stores/useClientsStore";
import { Client } from "@/types/Client";
import { useEffect, useState } from "react";
import ClientsTable from "./shared/clientsTable";

export default function ClientsInLine() {

  const { clientsInLine, fetchClientsInLine, addClientToLine } = useClientsStore();
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    fetchClientsInLine();
  }, [fetchClientsInLine]);

  const handleAddClient = async () => {
    if (!clientName) return;
    await addClientToLine(clientName);
    setClientName("");
  };

  return (
    <div>
        <h1 className="text-2xl font-semibold mb-2">Clients in line</h1>

        <div className="bg-white rounded-lg shadow p-4 mb-4 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-1">
            <input
              type="text"
              placeholder="Full name"
              className="border border-gray-300 p-2 rounded-lg w-full sm:w-auto"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
            <span className="text-gray-500 text-sm select-none mt-1">
              Name of the client you're going to add in the line
            </span>
          </div>
          <button
            onClick={handleAddClient}
            disabled={!clientName}
            className="bg-[#00866e] text-white w-full sm:w-[200px] p-2 rounded-lg cursor-pointer
                      disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-default"
          >
            + Add to the line
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <ClientsTable clients={clientsInLine} />
        </div>
    </div>
  );
}
