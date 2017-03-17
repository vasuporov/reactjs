import React from 'react'; 

export default class Note extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			editing: false
		};
	}

	render() {
		if(this.state.editing){
			return this.renderEdit();
		}

		return this.renderNote();
	}

	renderEdit = () => {
		return <input type="text"
				ref={
				(e) => e ? e.selectionStart = this.props.task.length : null
				}
				autoFocus = {true}
				defaultValue = {this.props.task}
				onBlur = {this.finishEdit}
				onKeyPress = {this.checkEnter}
				/>;
	};

	renderNote = () => {
		const onDelete = this.props.onDelete;

		return (
		<div onClick={this.edit}>
			<span>{this.props.task}</span>
			{onDelete ? this.renderDelete() : null}
		</div>	
		);
	};

	renderDelete = () => {
		return <button onClick={this.props.onDelete}>X</button>	;
	}
	edit = () => {
		this.setState({
			editing: true
		});
	};

	delete = (e) => {

	}

	checkEnter = (e) => {
		console.log(e.key);
		if(e.key == 'Enter')
		{
			console.log('here');
			this.finishEdit(e);
		}
	};

	finishEdit = (e) => {
		const value = e.target.value;
		console.log(value);

		if(this.props.onEdit){
			console.log('inside finish edits if');

			this.props.onEdit(value);

			this.setState({
				editing: false
			});
		}
	};

}