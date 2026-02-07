import Avatar from "../atoms/Avatar";
import Pill from "../atoms/Pill";

interface TransactionProps {
  user: {
    name: string;
    photo: string;
  };
  date: string;
  currency: string;
  amount: number;
  status: "pending" | "completed" | "rejected";
}
export default function Transaction({
  user,
  date,
  currency,
  amount,
  status,
}: TransactionProps) {
  return (
    <div className="flex justify-between gap-10 rounded-xl bg-white">
      <div className="flex gap-4">
        <Avatar src={user.photo} alt={user.name} />
        <div>
          <p className="text-sm font-medium text-[#2A2F4E]">{user.name}</p>
          <p className="text-gray-400 text-xs">{date}</p>
        </div>
      </div>
      <div>
        <p className="font-normal text-[#2A2F4E]">
          <span className="font-medium text-[#838AA2] text-sm">{currency}</span>
          {amount}
        </p>
        <Pill variant={status === "pending" ? "warning" : "success"}>
          {status === "pending" ? "Pending" : "Success"}
        </Pill>
      </div>
    </div>
  );
}
