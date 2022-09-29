import { useEffect, useState } from "react";
import CountryCard from '../components/CountryCard';
import axios from "axios";
import { CSVLink } from "react-csv";
import XMLExport from './ExportXML';

export default function Countries({ region, country }) {

    const [countries, setCountries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(12);
    let pages = [];

    const headers = [
        { label: 'Nome', key: 'name' },
        { label: 'Capital', key: 'capital' },
        { label: 'Região', key: 'region' },
        { label: 'Sub-região', key: 'subregion' },
        { label: 'População', key: 'population' },
        { label: 'Área', key: 'area' },
        { label: 'Fuso horário', key: 'timezones' },
        { label: 'Nome nativo', key: 'nativeName' },
        { label: 'Link da bandeira', key: 'flag' }
    ];

    useEffect(() => {
        async function fecthData() {
            if (country) {
                await axios.get(`https://restcountries.com/v2/all?fields=name,capital`).then((response) => {
                    setCountries(response.data);
                });
            } else {
                if (region == 'all') {
                    await axios.get(`https://restcountries.com/v2/all`).then((response) => {
                        setCountries(response.data);
                    });
                } else {
                    await axios.get(`https://restcountries.com/v2/region/${region}`).then((response) => {
                        setCountries(response.data);
                    });
                }
            }
        }

        fecthData();
    }, [country]);

    const lastPos = currentPage * cardsPerPage;
    const firstPos = lastPos - cardsPerPage;
    const currentPosts = countries.slice(firstPos, lastPos);
    for (let i = 1; i <= Math.round(countries.length / cardsPerPage); i++) {
        pages.push(i)
    }

    const csvReport = {
        filename: `${region}countries_${new Date().toJSON().slice(0, 10)}_${new Date().toJSON().slice(11, 19)}.csv`,
        headers: headers,
        data: countries,
    }

    const excelReport = {
        filename: `${region}countries_${new Date().toJSON().slice(0, 10)}_${new Date().toJSON().slice(11, 19)}.xls`,
        headers: headers,
        data: countries,
    }

    const fieldsAsStrings = {
        "name" : "Nome Column",
        "capital" : "Capital Column",
        "region" : "Região Column",
        "subregion" : "Sub Região",
        "population" : "População",
        "area" : "Área",
        "timezones" : "Fuso horário",
        "nativeName" : "Nome nativo",
        "flag" : "Bandeira"
    };

    return (
        <>
            <div className="flex justify-end gap-3 pb-6">
                <CSVLink {...csvReport} className='px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600'> Exportar em CSV </CSVLink>
                <CSVLink {...excelReport} className='px-4 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600'> Exportar em XLS </CSVLink>
                <XMLExport data={countries} fileName={region} fields={fieldsAsStrings}> </XMLExport>
            </div>
            <div className='grid grid-cols-4 gap-y-12 gap-x-12'>
                {currentPosts.map(item => {
                    return (
                        <CountryCard code={item.alpha2Code} key={item.alpha2Code} name={item.name} region={item.region} flag={item.flag} />
                    )
                })}
            </div>

            <div className="flex justify-center gap-2 py-10">
                {
                    pages.map(item => (
                        <button
                            key={item}
                            className={`
                                w-10 
                                h-10 
                                p-4 
                                rounded 
                                flex 
                                items-center 
                                justify-center
                                hover:bg-blue-500 
                                hover:text-white 
                                ${item === currentPage ? 'bg-blue-500 text-white' : 'border-blue-500 border-solid border-2 text-blue-500 bg-transparent'}
                            `}

                            onClick={() => setCurrentPage(item)}
                        >{item}</button>
                    ))
                }
            </div>
        </>
    )
}