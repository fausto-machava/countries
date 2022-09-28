import bg from '../assets/bg.svg';
import searchIcon from '../assets/search.svg';

export default function Header(){
    return (
        <header
            className='flex flex-col items-center justify-between gap-6 py-6 bg-no-repeat bg-cover'
            style={{ backgroundImage: `url(${bg})` }}
        >
            <h2
                className='font-bold text-xl text-white'
            >Encontre informação sobre países num só lugar</h2>

            <form
                className='flex items-center bg-white p-4 shadow rounded-lg'
            >
                <button><img src={searchIcon} alt="search-logo" /></button>
                <input className='px-8 border-0 border-transparent focus:border-transparent focus:border-0' placeholder='Pesquisar pais...' type="search" name="search" />
            </form>
        </header>
    )
}