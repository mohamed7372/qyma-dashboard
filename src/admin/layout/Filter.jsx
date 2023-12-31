import { Input, Select } from "@chakra-ui/react";
import InputCustom from "../../components/form/InputCustom";
import SelectCustom from "../../components/form/SelectCustom";
import { useEffect, useState } from "react";
import categoriesService from '../../services/categories'

const Filter = ({showCat, showTypeAccount}) => {
    const [categories, setCategories] = useState([])

    const dataStatus = [
        {
            _id: 0,
            title: 'not published'
        },
        {
            _id: 1,
            title: 'published'
        }
    ]

    const dataTypeAccount = [
        {
            id: 0,
            title: 'V'
        }
    ]

    // useEffect(() => {
    //     categoriesService
    //         .getAll()
    //         .then(res => setCategories(res.categories))
    //         .catch(err=> console.log(err))
    // }, [])
    
    return (
        <div className="grid grid-cols-4 gap-x-6 mt-8 mb-8">
            <InputCustom title={'from'}/>
            <InputCustom title={'to'}/>
            <SelectCustom title={'status'} data={dataStatus}/>
            {showCat && <SelectCustom title={'categories'} data={categories}/>}
            {showTypeAccount && <SelectCustom title={'type account'} data={dataTypeAccount}/>}
        </div>
    )
}

export default Filter