
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

export default function CountryDesc() {
    const [countryDetails, setCountryDetails] = useState();
    let { code } = useParams();

    useEffect(() => {
        const getCountryDetails = async () => {
            axios.get(`https://restcountries.com/v2/alpha/${code}`).then((response) => {
                setCountryDetails(response.data);
            });
        };
        getCountryDetails();
    }, [code])

    if (!countryDetails) return null;

    return (
        <div>
            <div className="px-12 py-8">
                <strong className="block py-4">{countryDetails.name}</strong>
                <Link to={'/'} className="text-blue-500 underline cursor-pointer">Retroceder</Link>

                <div className='grid grid-cols-2 py-8 h-[250px]'>
                    <div className='shadow-lg'>
                        <img className='object-contain w-full h-[250px]' src={countryDetails.flag} alt="" />
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
                                <strong>{countryDetails.capital}</strong>
                                <strong>{countryDetails.region}</strong>
                                <strong>{countryDetails.subregion}</strong>
                                <strong>{countryDetails.population}</strong>
                                <strong>{countryDetails.area}</strong>
                                <strong>{countryDetails.timezones[0]}</strong>
                                <strong>{countryDetails.nativeName}</strong>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative py-4 w-full mt-8'>
                    <MapContainer className='h-52' center={countryDetails.latlng} zoom={4} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={countryDetails.latlng}>
                            <Popup>
                                {countryDetails.name}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}