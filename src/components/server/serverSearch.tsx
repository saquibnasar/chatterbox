"use client";

type ServerSearchProps = {
  data: {
    lebel: string;
    type: "channel" | "member";
    data:
      | {
          icon?: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
};

export default function ServerSearch(props: ServerSearchProps) {
  return <div>serverSearch</div>;
}
