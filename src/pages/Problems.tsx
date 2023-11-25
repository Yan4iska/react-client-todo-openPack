import  { FC, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { instance } from "../api/axios.api"
import ColumnModal from '../components/ModalWindows/ColumnModal';
import { useLoaderData } from 'react-router-dom';
import { IColumn } from '../types/types';
import Board from '../components/Board/Board';
import { DndContext, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { DragStart } from 'react-beautiful-dnd';

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

export const columnLoader = async ()=>{
  const {data} = await instance.get<IColumn>('/cases')
 //best// console.log(data)
  return data
}


const Problems: FC = () => {
  const columns = useLoaderData() as IColumn[]
 //best// console.log(columns)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [columnId, setColumnId] = useState<number>(0)

  // for dnd fortableContext
  const columnsId = useMemo(()=> columns.map((col)=>col.id), [columns])

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null)

return (
  <>
  <div className='board'>
    <DndContext onDragStart={ onDragStart}>
      <div className='board--mAuto'>
          <div className='board__gap'>
            <SortableContext items={columnsId}>
            {columns.map((col)=>(
               <Board key={col.id} column={col}/>
            ))}
            </SortableContext>
          </div>
          <button onClick={()=>{
              setVisibleModal(true)
          }} className='board__btn'>
          <FaPlus/>
          <span>Add column</span>
          </button>
      </div>

      {/* TO BE CONTINUE ... <DragOverlay></DragOverlay> */}
    </DndContext>
  </div>


  {
      visibleModal && (
          <ColumnModal type="POST" setVisibleModal={setVisibleModal}/>
      )
  }
  </>
)
  function onDragStart(event: DragStartEvent){
   // console.log("DRAG START", event);
    if(event.active.data.current?.type === "IColumn"){
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

}
//console.log(ColumnModal);

export default Problems