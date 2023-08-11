import Rating from "./Rating";
import { Link } from "react-router-dom";
import ImgNF from '../../../assets/img/image_not_found.jpeg'

const RelatedCard = ({ bussiness}) => {
    const imgSrc = bussiness.cardImages.length === 0 ? ImgNF : process.env.REACT_APP_BASE_URL + "\\" + bussiness.cardImages[0].filePath

    return (
        <div className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-lg w-full">
            <Link to={`../bussiness/${bussiness.id}`}>
                <img src={imgSrc} alt={bussiness.cardImages[0].name} className="select-none hover:opacity-70 w-full h-48 object-cover rounded-lg"/>   
            </Link>
            <Link to={`../bussiness/${bussiness.id}`}>
                <h4 className="hover:underline font-bold text-md mt-4 mb-2 truncate cursor-pointer">{bussiness.name}</h4>
            </Link>

            <Rating nbr_star={Math.floor(bussiness.rate)} square size={4}/>
            <p className="text-sm mt-3 text-justify h-16 overflow-hidden">{bussiness.smallDescription}</p>
        </div>
    );
}

export default RelatedCard;