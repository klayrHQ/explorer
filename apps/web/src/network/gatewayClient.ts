import axios, { AxiosError, AxiosResponse } from 'axios'

const gatewayClient = axios.create({
	baseURL: "https://gateway.klayr.dev/api/v1/",
	timeout: 1500,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Methods': 'POST,GET'
	}
})

gatewayClient.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	(error: AxiosError) => {
		console.error('Interceptor', 'response', 'error', error)
		Promise.reject(error)
	}
)

export default gatewayClient