import { Client } from "@/types/Client";

interface ClientsTableProps {
  clients: Client[];
}

export default function ClientsTable({ clients }: ClientsTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-gray-300">
          <th className="px-2 py-2 text-left">Number in line</th>
          <th className="px-2 py-2 text-left">Full name</th>
          <th className="px-2 py-2 text-left">Check-in time</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client.id} className="hover:bg-gray-50 border-b border-gray-300">
            <td className="px-4 py-3">{client.numberInLine}</td>
            <td className="px-4 py-3">{client.fullName}</td>
            <td className="px-4 py-3">
              {new Date(client.checkInTime + "Z").toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </td>
          </tr>
        ))}

        {clients.length === 0 && (
          <tr className="border-b border-gray-300">
            <td colSpan={3} className="px-4 py-3 text-center text-gray-500">
              No clients
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}