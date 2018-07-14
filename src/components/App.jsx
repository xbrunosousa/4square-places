import React, { Component } from 'react'
import './App.css'
import format from 'date-fns/format'
import { Button, Container } from 'reactstrap'
import Places from './Places/Places'

class App extends Component {

	componentDidMount() { }

	constructor() {
		super()
		this.state = {
			longitude: undefined,
			latitude: undefined,
			error: false,
			code: undefined,
			responseFull: undefined,
			venues: undefined,
			venueId: undefined,
			placeImages: undefined
		}
	}

	places = () => {
		const CLIENT_ID = 'OCDVFW22BQFU4H0JXZW4ILB2KFHOYP2GIYV04QJDBGVC1IGX'
		const CLIENT_SECRET = 'Y5WQPMK4YCZ4JP2SQ4UU0PWUSU22VUL2D4LCPI530V0VW2VH'
		const date = format(new Date(), 'YYYYMMDD')
		// fetch places
		fetch(`https://api.foursquare.com/v2/venues/search?ll=${this.state.latitude},${this.state.longitude}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${date}`)
			.then(res => res.json())
			.then(res => {
				console.log(res.response.venues)
				this.setState({
					code: res.meta.code,
					responseFull: res,
					venues: res.response.venues,
					venueId: res.response.venues.id
				})
			})

		// // fetch places images
		// fetch(`https://api.foursquare.com/v2/venues/4efcc946f9ab0847fa5fcced/photos?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${date}`)
		// 	.then(res => res.json())
		// 	.then(res => {
		// 		console.log(res.response.photos.items)
		// 		this.setState({
		// 			placeImages: res.response.photos.items
		// 		})
		// 	})
	}

	getLocation = () => {
		navigator.geolocation.getCurrentPosition((position) => {
			const latitude = position.coords.latitude
			const longitude = position.coords.longitude

			if (position.coords.latitude !== undefined) {
				this.setState({
					latitude: latitude,
					longitude: longitude
				})
				this.places()
			} else {
				this.setState({ error: true })
				console.log('Houve um erro ao buscar os dados')
			}
		})
	}

	loadImages = (id) => {
		const CLIENT_ID = 'OCDVFW22BQFU4H0JXZW4ILB2KFHOYP2GIYV04QJDBGVC1IGX'
		const CLIENT_SECRET = 'Y5WQPMK4YCZ4JP2SQ4UU0PWUSU22VUL2D4LCPI530V0VW2VH'
		const date = format(new Date(), 'YYYYMMDD')

		fetch(`https://api.foursquare.com/v2/venues/${id}/photos?&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${date}`)
			.then(res => res.json())
			.then(res => {
				if (res.response.photos !== undefined) {
					this.setState({
						placeImages: res.response.photos.items
					})
					console.log(this.state.placeImages)
					return this.state.placeImages
				} else {
					console.log('sem imagens para exibir')
				}
			})
	}

	render() {
		const dataReceived = this.state.venues
		return (
			<div className='App'>
				<Button className='btn-access-location' color='success' onClick={this.getLocation}>Permitir acesso a localização</Button>



				{this.state.code === 200 ?
					<Container fluid>
						<Places
							code={this.state.code}
							dataReceived={dataReceived}
							responseFull={this.state.responseFull}
							placeImages={this.state.placeImages}
							loadImages={() => this.loadImages()} />
					</Container>
					: null
				}

				{this.state.error === true &&
					<p>Houve um erro ao capturar sua localização.
					Recarregue a página. Se o problema persistir, tente novamente mais tarde.</p>}

			</div>
		)
	}
}

export default App
