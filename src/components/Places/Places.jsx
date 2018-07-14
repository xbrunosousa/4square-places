import React from 'react'

const Places = ({ dataReceived, placeImages, loadImages }) => (
	<div>
		{
			dataReceived.map((item, key) =>
				<div className='Places' key={key}>
					<p>Place: {item.name}</p>

					<p>Place ID: {item.id}</p>

					<p>Categoria: {item.categories[0].name}</p>

					<p><img
						className='icon-categories'
						alt={item.categories[0].name}
						src={`${item.categories[0].icon.prefix}88.png`} />
					</p>
					{/* {() => loadImages('4efcc946f9ab0847fa5fcced')} */}
					{placeImages !== undefined ?
						placeImages.map((Image, key) =>
							<div key={key}>
								<img
									alt='teste'
									src={`https://igx.4sqi.net/img/general/300x500${Image.suffix}`}
								/>
							</div>
						) : null
					}
					<button onClick={() => loadImages('4efcc946f9ab0847fa5fcced')}>Chamar imagens</button>
					<p>Place Image: </p>

					<p>Estado: {item.location.state}</p>

					<p>CEP: {item.location.postalCode}</p>

					<p>País: {item.location.country}</p>
				</div>
			)
		}
	</div>
)

export default Places