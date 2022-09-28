import { useEffect, useState } from "react";
import CountryCard from '../components/CountryCard';
import axios from "axios";

export default function Countries({ region }) {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        async function fecthData() {
            await axios.get(`https://restcountries.com/v3.1/region/${region}`).then((response) => {
                setCountries(response.data);
            });
        }

        fecthData();
    }, []);

    return (
        <div className='grid grid-cols-4 gap-y-12 gap-x-12'>
            {countries.map((item, index) => {
                return (
                    <CountryCard code={item.cca2} key={index} name={item.name.common} region={item.region} flag={`https://flagcdn.com/${item.cca2.toLowerCase()}.svg`} />
                )
            })}
        </div>
    )
}