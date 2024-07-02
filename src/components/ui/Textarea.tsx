import { TextareaHTMLAttributes } from "react";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...rest }: IProps) => {
  return (
    <textarea
      className="border-[1px] border-gray-300 shadow-md focus:border-[#4338CA] focus:outline-none focus:ring-1 focus:ring-[#4338CA] rounded-lg px-3 py-3 text-md w-full bg-transparent"
      rows={6}
      {...rest}
    />
  );
};

export default Textarea;
