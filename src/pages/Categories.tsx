import { FC, useState } from "react"
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai'
import {Form, useLoaderData} from 'react-router-dom'
import { FaPlus } from "react-icons/fa"
import CategoryModal from "../components/ModalWindows/CategoryModal"
import { instance } from "../api/axios.api"
import { ICategory } from "../types/types"


export const categoriesAction = async ({ request }: any) => {
  if (!request) {
    // Handle the case where the request object is undefined
    //console.error("Request object is undefined");
    return null;
  }

  switch (request.method) {
    case "POST": {
      const formData = await request.formData();
      const title = {
        title: formData.get("title"),
      };
      await instance.post("/categories", title);
      return null;
    }
    case "PATCH": {
      // Handle PATCH case if needed
      const formData = await request.formData();
      const category = {
        id: formData.get('id'),
        title: formData.get('title'),

      }
      await instance.patch(`/categories/${category.id}`, category)

      return null;
    }
    case "DELETE": {
      // Handle DELETE case if needed
      const formData = await request.formData();
      const categoryId = formData.get('id')
      await instance.delete(`/categories/${categoryId}`)
      return null;
    }
    default: {
      console.error("Invalid request method");
      return null;
    }
  }
};

export const categoryLoader = async ()=>{
  const {data} = await instance.get<ICategory>('/categories')
  return data
}

const Categories: FC = () => {
  //update fun
  const categories = useLoaderData() as ICategory[]
  const [categoryId, setCategoryId] = useState<number>(0)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  //-----

  //console.log(categories)
  const [state, setState] = useState<boolean>(true)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  //console.log(categoriesAction)
  return (
   <>
     <div className="categories">
      <h1>Your categories</h1>
      <div className="categories__content">

          {categories.map((category, idx)=>(
            <div key={idx} onClick={()=>setState(!state)} className="categories__item">
            {category.title}
              <div onClick={()=>setState(!state)} className={`categories__inside ${state ? "": "gg"}`}>
                
                <button onClick={()=>{
                  setVisibleModal(true),
                  setCategoryId(category.id)
                  setIsEdit(true)
                }}>
                  <AiFillEdit/>
                </button>
                <Form 
                className="flex"
                method="delete"
                action="/categories" >
                  <input name="id" type="hidden" 
                  value={category.id}/>
                  <button type="submit">
                  <AiFillCloseCircle/>
                  </button>
                </Form>
              </div>
            </div>
          ))}
      </div>

      <button onClick={()=>setVisibleModal(true)} className="categories__button">
        <FaPlus/>
        <span>Create a new category</span>
        </button>

    </div>
    {/* Add category Modal */}


    {visibleModal && (
      <CategoryModal  type='POST'  setVisibleModal={setVisibleModal}/>
    )}



    {/* Edit category Modal */}

    {visibleModal && isEdit && (
      <CategoryModal  type='PATCH' id={categoryId}  setVisibleModal={setVisibleModal}/>
    )}
   </>
  )
}

export default Categories
// 1 = 0.25rem