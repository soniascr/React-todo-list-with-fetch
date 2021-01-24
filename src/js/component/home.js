//NOTA: El primer ejercicio del Todo list estuve Googleando bastante para encontrar la manera de que funcionase pero acabé con un código muy complicado que me costaba entender. Al intentar añadir el fetch me daba muchos problemas así que he modificado el código para esta versión.

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

let TaskList = () => {
	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(
		() =>
			// here i fetch my todos from the API
			fetch("https://assets.breatheco.de/apis/fake/todos/user/soniascr")
				.then(r => r.json())
				.then(data => {
					setItems(data);
				}) //here it re-set the variable tasks with the incoming data
				.catch(function(error) {
					console.log(
						"Hubo un problema con la petición Fetch:" +
							error.message
					);
				}),
		[]
	);

	useEffect(
		function() {
			fetch("https://assets.breatheco.de/apis/fake/todos/user/soniascr", {
				method: "PUT",
				body: JSON.stringify(items),
				headers: {
					"Content-type": "application/json"
				}
			}).catch(err => {
				console.log("Request Failed", err);
			}); // Catch errors
		},
		[items]
	);

	const handleSubmit = event => {
		event.preventDefault();
		if (inputValue !== "") {
			setItems(
				items.concat({
					label: inputValue,
					done: false
				})
			);
		}
		setInputValue("");
	};
	const removeItem = index => {
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
	};

	return (
		<div className="list-group-flush m-3">
			<form onSubmit={event => handleSubmit(event)}>
				<input
					className="input"
					value={inputValue}
					placeholder={"What needs to be done?"}
					onChange={e => setInputValue(e.target.value)}
				/>
			</form>

			<ul>
				{items.map((item, index) => (
					<li className="list-group-item lead text-left" key={index}>
						{item.label}{" "}
						<button
							className="close"
							onClick={() => removeItem(index)}>
							X
						</button>
					</li>
				))}
				<div className="footer text-left text-muted p-2">
					<small>{items.length} items left</small>
				</div>
			</ul>
		</div>
	);
};

//create your first component
export function Home() {
	return (
		<div className="container text-center mt-5">
			<h1 className="display-3">Todos</h1>
			<div className="p-2 lead">
				<TaskList />
			</div>
		</div>
	);
}
