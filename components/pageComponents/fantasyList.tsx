import Link from "next/link";

export default function FantasyPoint({fantasyId, fantasyName, fantasyWinner} : {fantasyId : number, fantasyName : string, fantasyWinner:string}){

    return(
        <Link href={`/matches/${fantasyId}`} className="flex relative flex-col m-2 p-3 min-w-full h-30 bg-cs-bg-card rounded-xl border-cs-bg-border border-3 hover:bg-cs-bg-border">
            <div className="flex text-2xl justify-stert">{fantasyName}</div>
            <div className="flex absolute  bottom-0 text-xl pb-3">Победитель: {fantasyWinner} </div>
            <div className="absolute right-3 bottom-0 text-xl pb-3 text-cs-accent">Подробнее ▶</div>
        </Link>
    );

}