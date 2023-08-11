import { useEffect } from "react";
import Card from "../components/ui/Card"
import SideBar from "../layout/SideBar"
import StickyBox from "react-sticky-box";

const Add = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='grid grid-cols-12 min-h-screen'>
            <aside className='col-span-2 pt-10 bg-secondary-200'>
                <StickyBox offsetTop={40} offsetBottom={20}>
                    <SideBar/>
                </StickyBox>
            </aside>
            <main className='col-span-10 px-8'>
                <div className=''></div>
                {children}

                <div className='pt-5'></div>
            </main>
        </div>
    )
}

export default Add