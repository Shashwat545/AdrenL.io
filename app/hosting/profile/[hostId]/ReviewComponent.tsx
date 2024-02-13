import { AvatarFallback, AvatarImage } from "@/app/components/shadcn/Avatar";
import { Card, CardContent } from "@/app/components/shadcn/Card";
import { differenceInDays } from "date-fns";
import Avatar from "@/app/components/chat/Avatar";

interface ReviewComponentProps {
    reviewBody: string;
    userName: string;
    date: Date;
    userImage: string;
}

export default function ReviewComponent({reviewBody, userName, date, userImage}: ReviewComponentProps) {
        const currentDate: Date = new Date();
        const daysDifference: number = differenceInDays(currentDate, date);
  
    return (
    <Card className="w-full max-w-sm p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {reviewBody}
        </p>
        <div className="flex items-center gap-4">
          <div className="w-8 h-8">
                <Avatar />
          </div>
          <div className="grid gap-0.5 text-xs">
            <div className="font-medium">{userName}</div>
            <div className="text-gray-500 dark:text-gray-400">{daysDifference} days ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

