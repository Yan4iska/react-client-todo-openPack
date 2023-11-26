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
			<label>title</label>
			<input placeholder="title" onChange={event => setTitle(event.target.value)}/>
			<label>desc</label>
			<input placeholder="desc" onChange={event => setDesc(event.target.value)}/>
			<button onClick={handleClick}>submit</button>
		</div>
	)
}

export default TaskModal
