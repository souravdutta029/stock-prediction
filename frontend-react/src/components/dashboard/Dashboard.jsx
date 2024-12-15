import { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()
    const [ma100, setMa100] = useState()
    const [ma200, setMa200] = useState()
    const [prediction, setPrediction] = useState()
    const [mse, setMse] = useState()
    const [rmse, setRmse] = useState()
    const [r2, setR2] = useState()
    useEffect(() => {
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/protected-view/')
            } catch (error) {
                console.error('Error fetching in data: ', error)
            }
        }

        fetchProtectedData()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axiosInstance.post('/predict/', {
                ticker: ticker
            });

            // Set plots
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT 
            const plotUrl = `${backendRoot}${response.data.plot_img}`
            const ma100Url = `${backendRoot}${response.data.plot_100_dma}`
            const ma200Url = `${backendRoot}${response.data.plot_200_dma}`
            const predictionUrl = `${backendRoot}${response.data.plot_prediction}`
            setPlot(plotUrl)
            setMa100(ma100Url)
            setMa200(ma200Url)
            setPrediction(predictionUrl)
            setMse(response.data.mse)
            setRmse(response.data.rmse)
            setR2(response.data.r2)
            
            if (response.data.error) {
                setError(response.data.error)
            }
        } catch (error) {
            console.error('Error in API making request ', error)
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-6 mx-auto">
                <form onSubmit={handleSubmit}>
                    <input type="text" className='form-control text-uppercase' placeholder='Enter Stock Ticker' 
                        onChange={(e) => {setTicker(e.target.value)}} required
                    />
                    <small>{error && <div className='text-danger'>{error}</div>}</small>
                    <button type="submit" className='btn btn-info mt-3'>
                        {loading ? <span><FontAwesomeIcon icon={faSpinner} spin />Please Wait ...</span> : 
                        'Get Prediction'}
                    </button>
                </form>
            </div>
            {/* Print Prediction Plot */}
            {prediction && (
                <div className='prediction mt-5'>
                    <div className="p-3">
                        {plot && (
                            <img src={plot} style={{maxWidth: '100%'}} />
                        )}
                    </div>
                    <div className="p-3">
                        {ma100 && (
                            <img src={ma100} style={{maxWidth: '100%'}} />
                        )}
                    </div>
                    <div className="p-3">
                        {ma200 && (
                            <img src={ma200} style={{maxWidth: '100%'}} />
                        )}
                    </div>
                    <div className="p-3">
                        {prediction && (
                            <img src={prediction} style={{maxWidth: '100%'}} />
                        )}
                    </div>

                    <div className="text-light p-3">
                        <h4>Model Evaluation</h4>
                        <p>Mean Squared Error (MSE): {mse}</p>
                        <p>Root Mean Squared Error (RMSE): {rmse}</p>
                        <p>R-Squared (r2): {r2}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Dashboard