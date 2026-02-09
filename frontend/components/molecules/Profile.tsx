import { ComponentProps } from "react";
import Avatar from "../atoms/Avatar";
import Icon from "../atoms/Icon";

interface ProfileProps extends ComponentProps<"div"> {
  user: {
    name: string;
    username?: string;
    date?: string;
    photo: string;
  };
  verified?: boolean;
}
export default function Profile({
  user,
  verified,
  className,
  ...rest
}: ProfileProps) {
  return (
    <div className={`flex gap-2 items-start ${className}`} {...rest}>
      <Avatar src={user.photo} alt={user.name} />
      <div className="font-medium">
        <h3 className="text-base text-gray-800">{user.name}</h3>
        {user.username && (
          <p className="text-sm text-gray-500">@{user.username}</p>
        )}
        {user.date && <p className="text-sm text-gray-500">{user.date}</p>}
      </div>
      {verified && <Icon name="verified" />}
    </div>
  );
}
