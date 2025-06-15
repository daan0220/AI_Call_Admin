import { Badge } from "@/components/ui/badge";

type MyBadgeProps = React.ComponentProps<typeof Badge>;

export function MyBadge(props: MyBadgeProps) {
  return (
    <Badge
      {...props}
      style={{
        background: "#EEF4FF",
        color: "#5B7FFF",
        border: "1px solid #5B7FFF",
        borderRadius: 8,
        ...props.style,
      }}
      className={"px-2 py-1 text-xs font-semibold " + (props.className || "")}
    />
  );
} 