const Button = ({title, type, px, handleButton}) => {
    return (
        type === 0 ?
            (<button
                onClick={handleButton} 
                className={`rounded-md border border-primary-200 text-primary-200 font-semibold text-sm ${px} py-2`}>
                {title}
            </button>)
            :
            (<button
                onClick={handleButton} 
                className={`rounded-md text-white bg-primary-200 font-semibold text-sm ${px} py-2`} >
                {title}
            </button>)
    );
}
 
export default Button;