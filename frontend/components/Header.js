import React from 'react'
import { categories } from '@/constants/data'
import useNotesStore from '@/store/notesStore'

const Header = ({ count }) => {
    const { category, setCategory } = useNotesStore();
    return (
        <div className="flex mt-3">
            <div className="title-sc">
                <span className='text-xs uppercase text-gray-600'>Overview</span>
                <h2 className='text-2xl font-semibold'>Notes <span className="text-gray-600 text-lg">({count})</span></h2>
            </div>
            <div className="flex ml-12 flex-shrink gap-1 items-end">
                <span onClick={() => setCategory(null)} className={`cursor-pointer nav-item flex items-center p-2 py-1 justify-start flex-shrink-0 rounded-lg  font-medium ${category == null ? "bg-blue-500 shadow text-white" : "bg-gray-50"}`}>
                    All
                </span>
                {
                    categories.map((item, index) => (
                        <span onClick={() => setCategory(item)} key={index} className={`cursor-pointer nav-item flex items-center p-2 py-1 justify-start flex-shrink-0 rounded-lg  font-medium ${category == item ? "bg-blue-500 shadow text-white" : "bg-gray-50"}`}>
                            {item.title}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}

export default Header