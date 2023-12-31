import { FC } from "react"
import { Form } from "react-router-dom"


interface IColumnModal{
    type: 'POST' | 'PATCH'
    id?: number
    setVisibleModal: (visible: boolean) => void
}

const ColumnModal: FC<IColumnModal> = ({type, id,  setVisibleModal}) => {
  return (
    <div className="categoryModal">
        <Form 
        action="/problems"
        method={type}
        onSubmit={()=>setVisibleModal(false)}
        className="categoryModal__form">
            <label htmlFor="">
                <small>Label</small>
                <input 
                className="input input2" 
                type="text" 
                name="title" 
                placeholder="Title" 
                />
                <input type="hidden" name="id" value={id} />
            </label>
            <div className="preBtn">
                <button className="btn btn-green categoryModal__btn" type="submit">
                    {type == 'PATCH' ? 'Save' : 'Create'}
                </button>
                <button onClick={()=>setVisibleModal(false)} className="btn btn-red categoryModal__btn">
                    Close
                </button>
            </div>
        </Form>
    </div>
  )
}

export default ColumnModal