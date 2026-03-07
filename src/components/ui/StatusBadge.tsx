import Badge from "./Badge";

const statusMap: Record<string, "green" | "gold" | "blue" | "orange" | "red"> =
  {
    Dispatched: "green",
    Delivered: "green",
    Paid: "green",
    "On Time": "green",
    Processing: "gold",
    Confirmed: "blue",
    "Due Soon": "gold",
    Pending: "blue",
    "Awaiting LC": "orange",
    Overdue: "red",
    Delayed: "red",
  };

export default function StatusBadge({ status }: { status: string }) {
  const variant = statusMap[status] || "blue";
  return <Badge variant={variant}>{status}</Badge>;
}
