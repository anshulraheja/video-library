import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

    const [categories, setCategories] = useState();

    useEffect(() => {
        const getcategories = async () => {
            try {
                const response = await axios.get("/api/categories");
                setCategories(response.data.categories)
            } catch (error) {
                console.error(error.message);
            }
        };
        getcategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    )
}

const useCategory = () => useContext(CategoryContext);

export { useCategory, CategoryProvider }