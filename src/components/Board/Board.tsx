
import { useState } from 'react';
import {  IColumn } from '../../types/types'
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { Form, useLoaderData } from 'react-router-dom';
import { columnLoader } from '../../pages/Problems';
import ColumnModal from '../ModalWindows/ColumnModal';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities'

interface Props{
    column: IColumn
}

function Board (props: Props) {

  const [columnId, setColumnId] = useState<number>(0)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

    const {column} = props

    const {setNodeRef, attributes, listeners, transform, transition} = useSortable({
        id: column.id,
        data: {
            type: "IColumn",
            column,
        }
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (<>
        <div 
        ref={setNodeRef}
        style={style}
        className='column'>
            {/* column title */}
            <div 
            {...attributes}
            {...listeners}
            className='column__title'>
                <div className='column__title--gap'>
                    <div className="column__title--count">0</div>
                    {column.title}
                </div>
                <div className='column__title__btns'>
                    <button onClick={()=>{
                            setIsEdit(true)
                            setColumnId(column.id)
                            setVisibleModal(true)
                        }
                    } className='column__title__btn'>
                        <MdOutlineEdit size='1rem' color='white'/>
                    </button>
                    <Form
                    method='delete'
                    action='/problems'
                    >
                        <input type="hidden" name="id" 
                        value={column.id}
                        />
                        <button className='column__title__btn'>
                            <FaRegTrashAlt size='1rem' color='white'/>
                        </button>
                    </Form>
                </div>
            </div>
            {/* column task container */}
            <div className="column__container">
                Content
            </div>
            {/* column footer */}
            <div className="column__footer">

            </div>
        </div>

        {visibleModal && isEdit && (
      <ColumnModal  type='PATCH' id={columnId}  setVisibleModal={setVisibleModal}/>
    )}
        </>
    )
}

export default Board