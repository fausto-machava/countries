import filterIcon from '../assets/filter.svg';
import globoIcon from '../assets/globo.svg';
import Header from '../components/Header';
import { useState } from 'react';
import Countries from '../components/Countries';
import axios from 'axios';

export default function Home() {
    const [tab, setTab] = useState({ id: 1, region: 'africa' });
    const [countriesNumber, setCountriesNumber] = useState(0);

    async function handleSetTab(id, region) {
        setTab({ id, region });

        await axios.get(`https://restcountries.com/v3.1/region/${region}`).then((response) => {
            setCountriesNumber(response.data.length);
        });
    };

    return (
        <div
            className="min-w-full min-h-screen"
        >
            <Header />
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
                                className={`text-sm text-[#363636] px-4 py-2 rounded ${tab.id == 1 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(1, 'todas')}>Todas</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded ${tab.id == 2 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(2, 'africa')}>África</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded ${tab.id == 3 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(3, 'america')}>América</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded ${tab.id == 4 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(4, 'asia')}>Ásia</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded ${tab.id == 5 ? ' bg-gray-300 font-semibold' : ''}`}
                                role="presentation"
                            >
                                <button onClick={() => handleSetTab(5, 'europe')}>Europa</button>
                            </li>
                            <li
                                className={`text-sm text-[#363636] px-4 py-2 rounded ${tab.id == 6 ? ' bg-gray-300 font-semibold' : ''}`}
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
                        <p className='text-black'>Todas</p>
                    </div>
                    <div className={`${tab.id == 2 ? 'block' : 'hidden'}`}>
                        <Countries region='africa' />
                    </div>
                    <div className={`${tab.id == 3 ? 'block' : 'hidden'}`}>
                        <Countries region='america' />
                    </div>
                    <div className={`${tab.id == 4 ? 'block' : 'hidden'}`}>
                        <Countries region='asia' />
                    </div>
                    <div className={`${tab.id == 5 ? 'block' : 'hidden'}`}>
                        <Countries region='europe' />
                    </div>
                    <div className={`${tab.id == 6 ? 'block' : 'hidden'}`}>
                        <Countries region='oceania' />
                    </div>
                </div>
            </main>
        </div>
    )
}