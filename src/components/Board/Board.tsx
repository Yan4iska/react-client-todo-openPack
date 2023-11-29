
import { FC, useEffect, useState } from 'react'
import {  IColumn, ITask } from '../../types/types'
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { Form } from 'react-router-dom';
import ColumnModal from '../ModalWindows/ColumnModal';
import { instance } from '../../api/axios.api';
import Task from "../Task/Task.tsx"
import TaskModal from '../ModalWindows/TaskModal.tsx'


interface Props{
    column: IColumn
}

const Board:FC<Props> = (props) => {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [columnId, setColumnId] = useState<number>(0)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [visibleModalUpdateColumn, setVisibleModalUpdateColumn] = useState<boolean>(false)
    const [visibleModalCreateTask, setVisibleModalCreateTask] = useState<boolean>(false)
    useEffect(() => {
        const getTask = async () => {
            const {data} = await instance.get<ITask[]>("problem/byCase", {params: {caseId: props.column.id}})
            console.log(data);
            setTasks(data)
        }

        getTask()
    }, [tasks])

    const {column} = props

    return (
        <>
            <div className='column'>
                {/* column title */}
                <div className='column__title'>
                    <div className='column__title--gap'>
                        <div className="column__title--count">0</div>
                        {column.title}
                    </div>
                    <div className='column__title__btns'>
                        <button onClick={()=>{
                                setIsEdit(true)
                                setColumnId(column.id)
                                setVisibleModalUpdateColumn(true)
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
                    {tasks.length > 0 ? tasks.map((task) => <Task key={task.id} {...task}/>) : "нет задач"}
                </div>
                {/* column footer */}
                <div className="column__footer">
                    <button className='btn btn-green' onClick={() => setVisibleModalCreateTask(true)}>
                        +add task
                    </button>
                </div>
            </div>

            {visibleModalUpdateColumn && isEdit && (
                <ColumnModal  type='PATCH' id={columnId}  setVisibleModal={setVisibleModalUpdateColumn}/>
            )}
            {visibleModalCreateTask  && (
                <TaskModal  type='POST' id={props.column.id}  setVisibleModal={setVisibleModalCreateTask}/>
            )}
        </>
    )
}

export default Board
