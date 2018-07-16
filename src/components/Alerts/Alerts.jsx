import React from 'react'
import { Alert } from 'reactstrap'

const a400 = (
	<Alert color='danger' style={{ textAlign: 'center' }}>
		Houve um erro ao buscar os dados. Tente novamente mais tarde.
	</Alert>
)

const a403 = (
	<Alert color='danger' style={{ textAlign: 'center' }}>
		Cota excedida. Tente novamente mais tarde.
	</Alert>
)

export default { a400, a403 }