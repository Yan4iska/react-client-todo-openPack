import { FC, useState } from 'react'
import { ITask } from '../../types/types.ts'
import { FaArrowRight } from 'react-icons/fa'
import { instance } from '../../api/axios.api.ts'

const Task: FC<ITask> = ({title, status, id}) => {
	const [isDone, setIsDone] = useState(status)
	const handleClick =  () => {
		instance.patch(`problem/${id}`, {status: !isDone})
			.then(() => {
				setIsDone(!isDone)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	return (
		<div className="task">
			<div className="task__title">{title.repeat(15)}</div>
			<div className="task__btns">
				<input type="checkbox" checked={isDone} onClick={handleClick}/>
				{/*todo add onClick*/}
				<FaArrowRight/>
			</div>
		</div>
	)
}

export default Task
