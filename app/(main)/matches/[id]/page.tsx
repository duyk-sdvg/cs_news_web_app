export default async function MatchPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <div>Матч {id}</div>;
}
