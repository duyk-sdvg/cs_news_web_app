export default function Footer() {
  return (
    <div className="flex flex-col w-full items-center h-30 bg-cs-bg-card ">
      <div className="flex flex-col w-max text-sm ">
        <div className="flex   p-2">
          {" "}
          Новости предоставлены сервисом{" "}
          {
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://newsapi.org"
              className="ml-2 hover:text-cs-accent "
            >
              NewsAPI.org
            </a>
          }
        </div>
        <div className="flex p-2 ">
          {" "}
          Статистика матчей и команд предоставлена{" "}
          {
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://csapi.de"
              className="ml-2 hover:text-cs-accent"
            >
              CS API
            </a>
          }
        </div>
        <div className="flex p-2">
          Сайт не аффилирован с Valve Corporation. Counter-Strike 2 и связанные
          логотипы являются торговыми марками Valve Corporation.
        </div>
      </div>
    </div>
  );
}
