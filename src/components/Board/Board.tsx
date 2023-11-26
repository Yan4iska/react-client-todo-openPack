
import { useState } from 'react';
import {  IColumn } from '../../types/types'
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { Form } from 'react-router-dom';
import ColumnModal from '../ModalWindows/ColumnModal';


interface Props{
    column: IColumn
}

function Board (props: Props) {

    const [columnId, setColumnId] = useState<number>(0)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [visibleModal, setVisibleModal] = useState<boolean>(false)

    const {column} = props

    return (<>
        <div 
        className='column'>
            {/* column title */}
            <div 
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
                    footer
            </div>
        </div>

        {visibleModal && isEdit && (
      <ColumnModal  type='PATCH' id={columnId}  setVisibleModal={setVisibleModal}/>
    )}
        </>
    )
}

export default Board