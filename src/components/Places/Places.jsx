import React from 'react'

const Places = ({ dataReceived }) => (
	<div>
		{
			dataReceived.map((item, key) =>
				<div className='Places' key={key}>

					<img
						className='icon-categories'
						alt={item.categories[0].name}
						src={`${item.categories[0].icon.prefix}88.png`}
					/>

					<p>Place: {item.name}</p>

					<p>Place ID: {item.id}</p>

					<p>Categoria: {item.categories[0].name}</p>

					<p>Estado: {item.location.state}</p>

					<p>CEP: {item.location.postalCode}</p>

					<p>País: {item.location.country}</p>
				</div>
			)
		}
	</div>
)

export default Places