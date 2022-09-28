import { Link } from "react-router-dom";


export default function CountryCard(props){
    return(
        <Link to={`/country/${props.code.toLowerCase()}`} className="flex flex-col gap-2 h-[200px] w-[200px]">
            <span className="w-full">
                <img src={props.flag} alt="FinlandFlag" className='w-full h-[120px] shadow'/>
            </span>
            <span className='text-sm text-zinc-700'>
                Nome Comum: <strong>{props.name}</strong>
            </span>
            <span className='text-sm text-zinc-700'>
                {props.region}
            </span>
        </Link>
    )
}