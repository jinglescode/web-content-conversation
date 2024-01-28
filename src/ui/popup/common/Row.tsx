import { Table } from "@radix-ui/themes"

export default function Row({ children, label }) {
  return (
    <Table.Row>
      <Table.RowHeaderCell width="120px">{label}</Table.RowHeaderCell>
      <Table.Cell>{children}</Table.Cell>
    </Table.Row>
  )
}
