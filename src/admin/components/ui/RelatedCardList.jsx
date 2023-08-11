import RelatedCard from "./RelatedCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";

const RelatedCardList = ({items}) => {
    return (
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-20 px-8 md:px-0">
        <div className="px-4 md:px-0">
            <div className="h-full w-full items-center sm:flex">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    breakpoints={{
                        640: {
                            spaceBetween:20,
                            slidesPerView:4.1,
                        },
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                    // onSwiper={swiper => setSwiperRef(swiper)}
                >
                    {
                        items.map(item =>
                            <SwiperSlide key={item.id}>
                                <div className="md:w-[250px]">
                                    <RelatedCard bussiness={item}/>
                                </div>
                            </SwiperSlide>
                        )
                    }
                    
                </Swiper>
            </div>
        </div>
    );
}
 
export default RelatedCardList;