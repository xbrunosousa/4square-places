import React, { Component } from 'react'
import './App.css'
import format from 'date-fns/format'
import { Button, Container, Alert } from 'reactstrap'
import Places from './Places/Places'

class App extends Component {
	constructor() {
		super()
		this.state = {
			longitude: undefined,
			latitude: undefined,
			isLoading: false,
			error: false,
			code: undefined,
			venues: undefined
		}
	}

	places = () => {
		const CLIENT_ID = 'T2LPSOLZ5QN313AVWZIOFYMTENZFECV3I2H33V0Q435ANRED'
		const CLIENT_SECRET = 'RZTUNDKJ12MBH1GR30YPHJU3RCRLR5VT20ELPYTQJ1XH3HUL'
		const date = format(new Date(), 'YYYYMMDD')
		// fetch places
		fetch(`https://api.foursquare.com/v2/venues/search?ll=${this.state.latitude},${this.state.longitude}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${date}`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					code: res.meta.code,
					venues: res.response.venues,
					isLoading: false
				})
			})
	}

	getLocation = () => {
		this.setState({ isLoading: true })
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
			}
		})
	}

	render() {
		const dataReceived = this.state.venues
		return (
			<div className='App'>
				<Button className='btn-access-location' color='success' onClick={this.getLocation}>Permitir acesso a localização</Button>

				{
					this.state.isLoading === true &&
					<p>Tá carregando. Pode demorar um pouco, calma aê!</p>
				}



				{this.state.code === 200 ?
					<Container fluid>
						<Places
							code={this.state.code}
							dataReceived={dataReceived}
						/>
					</Container>
					: null
				}

				{
					this.state.code === 400 &&
					<Alert color='danger' style={{ textAlign: 'center' }}>
						Houve um erro ao buscar os dados. Tente novamente mais tarde.
					</Alert>
				}

				{
					this.state.code === 403 &&
					<Alert color='danger' style={{ textAlign: 'center' }}>Cota excedida. Tente novamente amanhã.</Alert>
				}

				{this.state.error === true &&
					<Alert color='danger' style={{ textAlign: 'center' }}>Houve um erro ao capturar sua localização.
					Recarregue a página. Se o problema persistir, tente novamente mais tarde.</Alert>}

			</div>
		)
	}
}

export default App