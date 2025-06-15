import { Button } from "@/components/ui/button";

type MyButtonProps = React.ComponentProps<typeof Button>;

export function MyButton(props: MyButtonProps) {
  return (
    <Button
      {...props}
      style={{
        background: "#5B7FFF",
        color: "#fff",
        borderRadius: 8,
        ...props.style,
      }}
      className={"px-4 py-2 font-semibold shadow-sm " + (props.className || "")}
    />
  );
} 