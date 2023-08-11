const Rating = ({ nbr_star, square=false, size=5}) => {
    const stars = [false, false, false, false, false];

    return (
        <div className="flex">
            {stars.map((star, idx) => 
                square ?
                    <div className={`rounded-md p-0.5 mr-1 ${idx < nbr_star ? 'bg-primary-300': 'bg-primary-200'}`} key={idx}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='#ffffff' viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className={`w-${size} h-${size}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>    
                    </div>
                :
                    <svg key={idx} xmlns="http://www.w3.org/2000/svg" fill={idx < nbr_star ? "#f19c33" : "#584632"} viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className={`w-${size} h-${size}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
            )}
        </div>
    );
}
 
export default Rating;