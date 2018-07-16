import React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'

const Map = ReactMapboxGl({
	accessToken: 'pk.eyJ1IjoiYnJ1bm92bWUiLCJhIjoiY2pqZTNvY3Y2NGoxNjNxb2duN3V6czJyNyJ9.LP1cdUBGFmCo1-kRvy7olg'
})

const Places = ({ dataReceived }) => (
	<div className='places-app container-fluid'>
		{
			dataReceived.slice(0, 15).map((item, key) =>
				<div className='Places row' key={key}>

					<div className='col-sm-6'>
						<img
							className='icon-categories'
							alt={item.categories[0].name}
							src={`${item.categories[0].icon.prefix}88.png`}
						/>
						<p>Longitude: {item.location.lng}</p>
						<p>Latitude: {item.location.lat}</p>

						<p>Place: {item.name}</p>

						<p>Place ID: {item.id}</p>

						<p>Categoria: {item.categories[0].name}</p>

						<p>Estado: {item.location.state}</p>

						<p>CEP: {item.location.postalCode}</p>

						<p>País: {item.location.country}</p>
					</div>
					<Map
						// eslint-disable-next-line
						style='mapbox://styles/brunovme/cjje463n88k2t2rry62gll03o'
						center={[item.location.lng, item.location.lat]}
						className='map-place col-sm-6'
						zoom={[15]}

						containerStyle={{
							height: '400px',
							width: '100%',
						}}>
						<Layer
							type='symbol'
							id='marker'
							layout={{ 'icon-image': 'marker-15' }} >
							<Feature
								coordinates={[item.location.lng, item.location.lat]}
							/>
						</Layer>
					</Map>
				</div>
			)
		}
	</div>
)

export default Places
