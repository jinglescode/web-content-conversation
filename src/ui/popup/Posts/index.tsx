import { Table } from "@radix-ui/themes";

import ShortenUrl from "./ShortenUrl";
import CreditApp from "./CreditApp";
import WineSearch from "./WineSearch";
// import SortBy from "./SortBy";

export default function Posts() {
  return (
    <Table.Root>
      <Table.Body style={{ verticalAlign: "middle" }}>
        <ShortenUrl />
        <CreditApp />
        <WineSearch />
        {/* <NostrIcons /> */}
        {/* <SortBy /> */}
        {/* todo: future, until we can get reaction counts into an object */}
      </Table.Body>
    </Table.Root>
  );
}
