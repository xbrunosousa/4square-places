import React, { Component } from 'react'
import format from 'date-fns/format'
import { Button, Alert } from 'reactstrap'
import Places from './Places/Places'
import { a400, a403 } from './Alerts/Alerts'
import Loading from './Loading/Loading'
import NavbarApp from './NavbarApp/NavbarApp'
import Footer from './Footer/Footer'
import './App.css'

class App extends Component {
	constructor() {
		super()
		this.state = {
			lng: undefined,
			lat: undefined,
			isLoading: false,
			errorLocate: false,
			code: undefined,
			venues: undefined,
			accessLocation: 'Permitir acesso à localização'
		}
	}

	places = () => {
		const CLIENT_ID = 'T2LPSOLZ5QN313AVWZIOFYMTENZFECV3I2H33V0Q435ANRED'
		const CLIENT_SECRET = 'RZTUNDKJ12MBH1GR30YPHJU3RCRLR5VT20ELPYTQJ1XH3HUL'
		const date = format(new Date(), 'YYYYMMDD')

		// fetch places
		fetch(`https://api.foursquare.com/v2/venues/search?ll=${this.state.lat},${this.state.lng}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&limit=15&v=${date}`)
			.then(res => res.json())
			.then(res => {
				console.log(res)
				this.setState({
					code: res.meta.code,
					venues: res.response.venues,
					isLoading: false,
					accessLocation: 'Atualizar sua localização'
				})
			})
	}

	getLocation = () => {
		this.setState({
			isLoading: true,
			accessLocation: 'Obtendo sua localização. Por favor, aguarde...'
		})
		navigator.geolocation.getCurrentPosition((position) => {
			const latitude = position.coords.latitude
			const longitude = position.coords.longitude

			if (position.coords.latitude !== undefined) {
				this.setState({
					lat: latitude,
					lng: longitude,
					accessLocation: 'Localização obtida. Carregando resultados...'
				})
				this.places()
			} else {
				this.setState({ errorLocate: true })
			}
		})
	}

	render() {
		let alert = null
		const {
			code,
			accessLocation,
			isLoading,
			errorLocate,
			venues
		} = this.state
		switch (code) {
			case 200:
				alert = (
					<Places
						code={code}
						dataReceived={venues}
					/>
				)
				break

			case 400:
				alert = [a400]
				break

			case 403:
				alert = [a403]
				break

			default: alert = null
		}
		return (
			<div className='App'>
				<NavbarApp />
				<Button
					outline
					className='btn-access-location'
					color='success'
					onClick={this.getLocation}>
					{accessLocation}
				</Button>

				{
					isLoading === true &&
					<Loading />
				}

				{alert}

				{
					errorLocate === true &&
					<Alert color='danger' style={{ textAlign: 'center' }}>
						Houve um erro ao capturar sua localização.
						Recarregue a página. Se o problema persistir, tente novamente mais tarde.
					</Alert>
				}
				<Footer />
			</div>
		)
	}
}

export default App
