
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function CountryDesc() {
    const [countryDetails, setCountryDetails] = useState();
    let { code } = useParams();

    useEffect(() => {
        const getCountryDetails = async () => {
            axios.get(`https://restcountries.com/v3.1/alpha/${code}`).then((response) => {
                setCountryDetails(response.data);
            });
        };
        getCountryDetails();
    }, [])

    if (!countryDetails) return null;

    return (
        <div>
            {
                countryDetails.map((item) => {
                    return (
                        <div className="px-12 py-8">
                            <strong className="block py-4">{item.name.common}</strong>
                            <Link to={'/'} className="text-blue-500 underline cursor-pointer">Retroceder</Link>

                            <div className='grid grid-cols-2 py-8 h-[250px]'>
                                <div>
                                    <img className='object-cover w-full h-[250px]' src={`https://flagcdn.com/${item.cca2.toLowerCase()}.svg`} alt="" />
                                </div>
                                <div className='flex justify-center'>
                                    <div className='grid grid-cols-2 gap-12 text-sm text-[#3C5296]'>
                                        <div className='flex flex-col gap-2'>
                                            <span>Capital</span>
                                            <span>Região</span>
                                            <span>Sub-região</span>
                                            <span>População</span>
                                            <span>Área</span>
                                            <span>Fuso horário</span>
                                            <span>Nome nativo</span>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <strong>{item.capital}</strong>
                                            <strong>{item.region}</strong>
                                            <strong>{item.subregion}</strong>
                                            <strong>{item.population}</strong>
                                            <strong>{item.area}</strong>
                                            <strong>{item.timezones}</strong>
                                            <strong>{item.name.nativeName.por.common}</strong>
                                        </div>
                                    </div>
                                </div>
                                {/* <iframe className='h-auto w-ful' src={item.maps.googleMaps} frameborder="0"></iframe> */}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}