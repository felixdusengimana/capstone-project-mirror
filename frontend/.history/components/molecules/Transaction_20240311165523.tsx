import Avatar from "../atoms/Avatar";

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
export default function Transaction() {
  return (
    <div className="flex justify-between gap-10">
      <div className="flex gap-4">
        <Avatar src="/profiles/profile1.png" />
      </div>
    </div>
  );
}
