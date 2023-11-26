import  { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { instance } from "../api/axios.api"
import ColumnModal from '../components/ModalWindows/ColumnModal';
import { useLoaderData } from 'react-router-dom';
import { IColumn, ITask } from '../types/types';
import Board from '../components/Board/Board';

export const columnsAction = async ({request}:any)=>{
  if(!request){
      return null;
  }

  switch(request.method) {
      case "POST": {
          const formData = await request.formData();
          const title = {
              title: formData.get('title'),
          };
          await instance.post('/cases', title);
          return null;
      }
      case "PATCH": {
        const formData = await request.formData();
        const column = {
          id: formData.get('id'),
          title: formData.get('title'),
        }
        await instance.patch(`/cases/${column.id}`, column)
          return null;
      }
      case "DELETE": {
        const formData = await request.formData();
        const columnId = formData.get('id')
        await instance.delete(`/cases/${columnId}`)
          return null;
      }
      default:{
          console.error("Invalid requeST method!");
          return null;
      }
  }
};

export const tasksAction = async ({request}:any)=>{
  if(!request) {
    return null;
  }

  switch(request.method){
    case "POST": {
      const formData = await request.formData();
      const title = {
        title: formData.get('title'),
        content: formData.get('content'),
        category: formData.get('category'),
        case: formData.get('case'),
        parent: formData.get('parent'),
      };
      await instance.post('/problem', title)
      return null;
    }
    case "PATCH": {
      return null;
    }
    case "DELETE":{
      return null;
    }
  }
};

export const columnLoader = async ()=>{
  const {data} = await instance.get<IColumn[]>('/cases')
  return data
}

export const TaskLoader = async ()=>{
  const {data} = await instance.get<ITask[]>('/problem')
  return data
}

const Problems: FC = () => {
    const columns = useLoaderData() as IColumn[]
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [columnId, setColumnId] = useState<number>(0)
    const [activeColumn, setActiveColumn] = useState<IColumn | null>(null)

  return (
    <>
    <div className='board'>

        <div className='board--mAuto'>
            <div className='board__gap'>

              {columns.map((col)=>(
                <Board key={col.id} column={col}/>
              ))}

            </div>
            <button onClick={()=>{
                setVisibleModal(true)
            }} className='board__btn'>
            <FaPlus/>
            <span>Add column</span>
            </button>
        </div>

          {activeColumn && (<Board column={activeColumn} key={activeColumn.id}/>)}
    </div>

    {
        visibleModal && (
            <ColumnModal type="POST" setVisibleModal={setVisibleModal}/>
        )
    }
    </>
  )
}
export default Problems
