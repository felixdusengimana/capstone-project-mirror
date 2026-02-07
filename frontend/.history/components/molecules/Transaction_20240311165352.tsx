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
  return <div>Transaction</div>;
}
