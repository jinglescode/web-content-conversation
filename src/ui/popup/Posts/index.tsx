import { Table } from "@radix-ui/themes";

import ShortenUrl from "./ShortenUrl";
// import SortBy from "./SortBy";

export default function Posts() {
  return (
    <Table.Root>
      <Table.Body style={{ verticalAlign: "middle" }}>
        <ShortenUrl />
        {/* <SortBy /> */} {/* todo: future, until we can get reaction counts into an object */}
        {/* todo: future, add credit after we got name and maybe website */}
      </Table.Body>
    </Table.Root>
  );
}