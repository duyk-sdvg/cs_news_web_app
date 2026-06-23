import Link from "next/link";

export default function NavigatePannel() {
  return (
    <div className="flex h-15 w-full bg-cs-bg-base justify-center ">
      <Link href="/" className="p-2 m-2 rounded-xl hover:bg-cs-bg-border">Главная</Link>
      <h1 className="p-2 m-2 rounded-xl hover:bg-cs-bg-border">Новости </h1>
      <Link href="/matches" className="p-2 m-2 rounded-xl hover:bg-cs-bg-border">Турниры</Link>
      <h1 className="p-2 m-2 rounded-xl hover:bg-cs-bg-border">О нас</h1>
    </div>
  );
}
