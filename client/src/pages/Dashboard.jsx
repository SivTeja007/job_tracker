import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

function Dashboard() {
    const [jobs, setJobs] = useState([])
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const fetchJobs = async () => {
        try {
            const res = await axios.get('/jobs', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setJobs(res.data)
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {
            fetchJobs()
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <h2>My Job Applications</h2>
            <button onClick={handleLogout}>Logout</button>

            {error && <p style={{color:'red'}}>{error}</p>}

            {jobs.length === 0 ? (
                <p>No jobs added yet</p>
            ) : (
                jobs.map(job => (
                    <div key={job._id}>
                        <h3>{job.company}</h3>
                        <p>{job.role}</p>
                        <p>{job.status}</p>
                        <p>{job.notes}</p>
                    </div>
                ))
            )}
        </div>
    )
}

export default Dashboard
