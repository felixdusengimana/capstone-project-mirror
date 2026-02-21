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
  isUserLoading?: boolean;
}
export default function Profile({
  user,
  verified,
  className,
  isUserLoading,
  ...rest
}: ProfileProps) {
  return (
    <div className={`flex gap-2 items-start ${className}`} {...rest}>
      <Avatar src={user.photo} alt={user.name} />
      <div className="font-medium flex items-start flex-col">
        {isUserLoading ? (
          <span className="animate-pulse bg-gray-200 h-4 w-40 block"></span>
        ) : (
          <h3 className="text-base text-gray-800">{user.name}</h3>
        )}

        {isUserLoading ? (
          <span className="animate-pulse bg-gray-200 h-2 w-20 block"></span>
        ) : (
          user.username && (
            <p className="text-sm text-gray-500">@{user.username}</p>
          )
        )}

        {user.date && <p className="text-sm text-gray-500">{user.date}</p>}
      </div>
      {verified && <Icon name="verified" />}
    </div>
  );
}
