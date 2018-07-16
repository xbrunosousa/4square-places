switch (this.state.code) {
	case 200:
		alert = (
			<Container fluid>
				<Places
					code={this.state.code}
					dataReceived={dataReceived}
				/>
			</Container>
		)
		break

	case 400:
		alert = (
			<Alert color='danger' style={{ textAlign: 'center' }}>
				Houve um erro ao buscar os dados. Tente novamente mais tarde.
			</Alert>
		)
		break

	case 403:
		alert = (
			<Alert color='danger' style={{ textAlign: 'center' }}>
				Cota excedida. Tente novamente mais tarde.
			</Alert>
		)
		break
}