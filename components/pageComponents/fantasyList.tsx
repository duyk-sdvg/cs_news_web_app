export default function FantasyPoint({fantasyName} : {fantasyName : string}){

    return(
        <div className="flex m-2 p-3 min-w-full bg-cs-bg-card justify-center rounded-xl border-cs-bg-border border-3 hover:bg-cs-bg-border">{fantasyName}</div>
    );

}