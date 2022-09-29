import filterIcon from '../assets/filter.svg';
import globoIcon from '../assets/globo.svg';
import bg from '../assets/bg.svg';
import searchIcon from '../assets/search.svg';
import { useState } from 'react';
import Countries from '../components/Countries';
import axios from 'axios';
import { useEffect, useRef } from 'react';

export default function Home() {
    const [tab, setTab] = useState({ id: 1, region: 'all' });
    const [countriesNumber, setCountriesNumber] = useState(0);
    const countriesInputRef = useRef();
    const [searcCountry, setSearchCountry] = useState('');

    useEffect(() => {
        axios.get(`https://restcountries.com/v2/all`).then((response) => {
            setCountriesNumber(response.data.length);
        });
    }, [])

    async function handleSetTab(id, region) {
        setTab({ id, region });
        
        setSearchCountry('');

        if (region == 'all') {
            await axios.get(`https://restcountries.com/v2/all`).then((response) => {
                setCountriesNumber(response.data.length);
            });
        } else {
            await axios.get(`https://restcountries.com/v2/region/${region}`).then((response) => {
                setCountriesNumber(response.data.length);
            });
        }
    };

    return (
        <div
            className="min-w-full min-h-screen"
        >
            <header
                className='flex flex-col items-center justify-between gap-6 py-6 bg-no-repeat bg-cover'
                style={{ backgroundImage: `url(${bg})` }}
            >
                <h2
                    className='font-bold text-xl text-white'
                >
                    Encontre informação sobre países num só lugar
                </h2>

                <form
                    className='flex items-center bg-white p-4 shadow rounded-lg'
                >
                    <button><img src={searchIcon} alt="search-logo" /></button>
                    <input ref={countriesInputRef} onChange={() => setSearchCountry(countriesInputRef.current.value)} className='px-8 border-0 border-transparent focus:border-transparent focus:border-0' placeholder='Pesquisar pais...' type="search" name="search" />
                </form>
            </header>
            <main
                className='px-16 mx-auto min-w-[1100px] py-6'
            >
                <div
                    className='flex justify-between items-center'
                >
                    <div>
                        <div
                            className='flex gap-4 py-4'
                        > <img src={filterIcon} alt="" /> <strong className='text-zinc-700'>Filtrar por Região</strong></div>
                        <ul
                            className='flex gap-1'
                        >
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded hover:bg-gray-300 hover:font-semibold ${tab.id == 1 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(1, 'all')}>Todas</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded hover:bg-gray-300 hover:font-semibold ${tab.id == 2 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(2, 'africa')}>África</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded hover:bg-gray-300 hover:font-semibold ${tab.id == 3 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(3, 'americas')}>América</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded hover:bg-gray-300 hover:font-semibold ${tab.id == 4 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(4, 'asia')}>Ásia</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded hover:bg-gray-300 hover:font-semibold ${tab.id == 5 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(5, 'europe')}>Europa</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded hover:bg-gray-300 hover:font-semibold ${tab.id == 6 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(6, 'oceania')}>Oceania</button>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div
                            className='flex gap-4 py-4'
                        >
                            <img src={globoIcon} alt="" />
                            <strong className='text-zinc-700'>Número de países</strong>
                        </div>
                        <div>
                            <span
                                className='text-sm text-gray-500'
                            ><strong className='text-[#297EFD]'>{countriesNumber}</strong> países pertencentes a esta categoria.</span>
                        </div>
                    </div>
                </div>
                <div className='py-10 flex justify-center'>
                    <div className={`${tab.id == 1 ? 'block' : 'hidden'}`}>
                        <Countries region='all' country={searcCountry}/>
                    </div>
                    <div className={`${tab.id == 2 ? 'block' : 'hidden'}`}>
                        <Countries region='africa' country={searcCountry}/>
                    </div>
                    <div className={`${tab.id == 3 ? 'block' : 'hidden'}`}>
                        <Countries region='americas' country={searcCountry}/>
                    </div>
                    <div className={`${tab.id == 4 ? 'block' : 'hidden'}`}>
                        <Countries region='asia' country={searcCountry}/>
                    </div>
                    <div className={`${tab.id == 5 ? 'block' : 'hidden'}`}>
                        <Countries region='europe' country={searcCountry}/>
                    </div>
                    <div className={`${tab.id == 6 ? 'block' : 'hidden'}`}>
                        <Countries region='oceania' country={searcCountry}/>
                    </div>
                </div>
            </main>
        </div>
    )
}