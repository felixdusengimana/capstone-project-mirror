import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Headline from "@/components/atoms/Headline";
import Icon from "@/components/atoms/Icon";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";

export default function SupportCreator() {
  return (
    <div className="flex flex-col items-center gap-24 h-full">
      <Headline className="text-[#374151] text-4xl text-center">
        Pesatone makes Supporting fun and easy.
      </Headline>
      <div className="w-[598px] flex flex-col items-center justify-between gap-10  rounded-2xl border border-gray-200 pt-24 pb-[61px] px-20 relative">
        <Avatar
          src="/profiles/profile1.png"
          className="absolute -top-16"
          size="xl"
        />

        <div className="flex items-center">
          <Headline className="text-black">The Ben</Headline>
          <Icon name="verified" />
        </div>

        <div className="flex items-center gap-4">
          <Icon name="facebook" width={20} height={20} fill="#9CA3AF" />
          <Icon name="youtube" width={20} height={20} fill="#9CA3AF" />
          <Icon name="instagram" width={20} height={20} fill="#9CA3AF" />
          <Icon name="twitter" width={20} height={20} fill="#9CA3AF" />
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Input
            label="Tip amount"
            placeholder="Tip amount"
            value={5000}
            right={
              <select className="bg-[#F7F9FB] text-[#475569]">
                <option value="RWF">RWF</option>
              </select>
            }
          />

          <Input label="Your name" placeholder="Your name" />
          <TextArea
            label="Say something nice"
            placeholder="Type something ....."
          />
        </div>
        <Button className="w-full">Pay 5,000 RWF</Button>
      </div>
    </div>
  );
}
