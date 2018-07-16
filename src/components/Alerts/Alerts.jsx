import React from 'react'
import { Alert } from 'reactstrap'
const index = 1
const a400 = (
	<Alert key={index} color='danger' style={{ textAlign: 'center' }}>
		Houve um erro ao buscar os dados. Tente novamente mais tarde.
	</Alert>
)

const a403 = (
	<Alert key={index} color='danger' style={{ textAlign: 'center' }}>
		Cota excedida. Tente novamente mais tarde.
	</Alert>
)

export { a400, a403 }