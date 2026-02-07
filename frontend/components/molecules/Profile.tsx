import Avatar from "../atoms/Avatar";
import Icon from "../atoms/Icon";

interface ProfileProps {
  user: {
    name: string;
    username: string;
    photo: string;
  };
  verified?: boolean;
}
export default function Profile({ user, verified }: ProfileProps) {
  return (
    <div className="flex gap-2 items-start">
      <Avatar src={user.photo} alt={user.name} />
      <div className="font-medium">
        <h3 className="text-base text-gray-800">{user.name}</h3>
        <p className="text-xs text-gray-500">@{user.username}</p>
      </div>
      {verified && <Icon name="verified" />}
    </div>
  );
}
