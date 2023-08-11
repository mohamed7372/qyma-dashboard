import data from '../../settings/podcast_platfrom.json'

const PodcastPlatform = ({css='w-[60%]'}) => {
    return (
        <div className={css}>
            <ul className="md:flex md:justify-between w-full grid grid-cols-2 gap-y-4">
                {
                    data.map((item, idx) => {
                        return <li key={idx}>
                            <a href="#" className='flex items-center'>
                                <img src={item.icon && require(`../../assets/icons/${item.icon}`)} alt="" className={`w-6 mr-2`} />
                                <p className='text-xs md:text-sm capitalize font-semibold'>{item.name}</p>
                            </a>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}
 
export default PodcastPlatform;