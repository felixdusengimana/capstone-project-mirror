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
export default function Transaction({
  user,
  date,
  currency,
  amount,
  status,
}: TransactionProps) {
  return (
    <div className="flex justify-between gap-10">
      <div className="flex gap-4">
        <Avatar src={user.photo} alt={user.name} />
        <div>
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-gray-600">{date}</p>
        </div>
      </div>
    </div>
  );
}
