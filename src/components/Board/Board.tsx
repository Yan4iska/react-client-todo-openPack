
import { useEffect, useState } from 'react';
import {  IColumn, ITask } from '../../types/types'
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { Form } from 'react-router-dom';
import ColumnModal from '../ModalWindows/ColumnModal';
import { instance } from '../../api/axios.api';


interface Props{
    column: IColumn
}

function Board (props: Props) {
    const [tasks, setTasks] = useState<ITask[]>([])
    useEffect(() => {
        const getTask = async () => {
            const {data} = await instance.get<ITask[]>("problem/byCase", {params: {caseId: props.column.id}})
            console.log(data);
            setTasks(data)
        }

        getTask()
    }, [])
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
                {tasks.length > 0 ? tasks.map((task) => task.title) : "нет задач"}
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