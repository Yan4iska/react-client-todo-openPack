import  { FC, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { instance } from "../api/axios.api"
import ColumnModal from '../components/ModalWindows/ColumnModal';
import { useLoaderData } from 'react-router-dom';
import { IColumn } from '../types/types';
import Board from '../components/Board/Board';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { DragStart } from 'react-beautiful-dnd';
import { createPortal } from 'react-dom';
import { Id } from 'react-toastify';

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
  const data = useLoaderData() as IColumn[]
  const [columns, setColumns] = useState(data)
 //best// console.log(columns)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [columnId, setColumnId] = useState<number>(0)

  // for dnd fortableContext
  const columnsId = useMemo(()=> columns.map((col)=>col.id), [columns])

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 300,
      },
    })
  );

return (
  <>
  <div className='board'>
    <DndContext sensors={sensors} onDragStart={ onDragStart} onDragEnd={onDragEnd}>
      <div className='board--mAuto'>
          <div className='board__gap'>
            <SortableContext items={columnsId}>
            {columns.map((col)=>(
               <Board deleteColumn={deleteColumn} key={col.id} column={col}/>
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
      {/* ======================================================= */}
      {createPortal(<DragOverlay>
        {activeColumn && (<Board deleteColumn={deleteColumn} column={activeColumn} key={activeColumn.id}/>)}
      </DragOverlay>, document.body)}
      {/* ======================================================= */}
  
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
  function onDragEnd(event: DragEndEvent){
    const {active, over} = event
    if(!over) return;
    
    const activeColumnId = active.id
    const overColumnId = over.id

    if(activeColumnId === overColumnId) return;
     setColumns(columns => {
      const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId)
      const overColumnIndex = columns.findIndex(col => col.id ===overColumnId)

      return arrayMove(columns, activeColumnIndex, overColumnIndex)
     })
  }


  function deleteColumn(){
    setColumns(data);
  }
}
//console.log(ColumnModal);


export default Problems