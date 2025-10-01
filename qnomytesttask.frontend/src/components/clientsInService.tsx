import { useClientsStore } from "@/stores/useClientsStore";
import { Client } from "@/types/Client";
import { useEffect, useState } from "react";
import ClientsTable from "./shared/clientsTable";

export default function ClientsInService() {

    const { clientInService, clientsInLine, fetchClientInService, callNextClient } = useClientsStore();

    useEffect(() => {
        fetchClientInService();
    }, [fetchClientInService]);

  return (
    <div>
        <h1 className="text-2xl font-semibold mb-2">In service</h1>
        <div className="bg-white rounded-lg shadow p-4">
            <ClientsTable clients={clientInService ? [clientInService] : []} />

            <div className="text-right mt-4">
                <button disabled={clientsInLine.length === 0 && !clientInService} onClick={callNextClient} className="bg-[#00866e] text-white p-3 rounded-lg ml-2 cursor-pointer
                    disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-default">
                    Next client
                </button>
            </div>
        </div>
    </div>
  );
}
