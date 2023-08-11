const ImageName = ({img, alt=''}) => {
    return (
        <div className={`img relative w-14 h-14 md:w-14 md:h-14 bg-primary-100 rounded-full overflow-hidden`}>
            <img src={ img} alt={alt} className="select-none "/>
            {/* <p className={`text-primary-200 font-bold text-2xl md:text-${taille} center-absolute`}>R</p> */}
        </div>
    );
}
 
export default ImageName;