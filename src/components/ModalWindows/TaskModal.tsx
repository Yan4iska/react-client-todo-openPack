import { FC, useState } from 'react'
import { instance } from '../../api/axios.api.ts'


interface ITask{
	type: 'POST' | 'PATCH'
	id?: number
	setVisibleModal: (visible: boolean) => void
	titleProps?: string
	descProps?: string
}

const TaskModal: FC<ITask> = ({type, id,  setVisibleModal, titleProps, descProps}) => {
	const [title, setTitle] = useState(titleProps || "")
	const [desc, setDesc] = useState(descProps || "")
	const handleClick = async () => {
		try {
			const data = type === "POST" ?
				await instance.post("problem", {
					title,
					content: desc,
					category: 2,
					case: id,
				}) :
				await instance.patch(`problem/${id}`, {
					title,
					content: desc,
				})
			console.log(data)
			setVisibleModal(false)
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className="categoryModal">
			<div className="categoryModal__form">
				<label>title</label>
				<input placeholder="title" onChange={event => setTitle(event.target.value)}/>
				<label>desc</label>
				<input placeholder="desc" onChange={event => setDesc(event.target.value)}/>
				<label>categories</label>
				<select name="category">
					<option value="1">front</option>
					<option value="2">back</option>

				</select>
				<label>Parent</label>
				<select name="parent">
					<option value="1">front</option>
					<option value="2">back</option>
				</select>
				<button className='btn btn-green' onClick={handleClick}>submit</button>
				<button onClick={()=>setVisibleModal(false)} className="btn btn-red categoryModal__btn">
                    Close
                </button>
			</div>
		</div>
	)
}

export default TaskModal
