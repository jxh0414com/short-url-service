import { Container, Row, Col } from 'react-bootstrap'
import AddShort from './AddShort'
import DisplayShort from './DisplayShort'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { validateShort } from './validate'
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

function Main() {
    const [Links, setLinks] = useState([])
    const [Error, setError] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/shorts').then(({ data }) => {
                setLinks(data.shorts)
                console.log(data.shorts)
            }).catch(err =>console.log(err))
        }
        fetchData();
    }, [])

    const shortenLink = async (Full, Short) => {
        const { isValid, errors } = validateShort({ Full, Short})
        if (!isValid) {
            setError(errors)
        } else {
            const body = { fullURL: Full }
            if (Short) {
                body.shortURL = Short
            }
            await axios.post('/api/shorts', body).then(({data}) => {
                setError({})
                console.log(data)
                setLinks([...Links, data])
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const deleteLink = async (id) => {
        await axios.delete('/api/shorts', { params: { id } }).then((res) => {
            if (res.status === 200) {
                setLinks(Links.filter(x => x.id !== id))
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="Main">
            <AppHeader />
            <Container style={styles.container} fluid>
                <Row style={styles.row}>
                    <Col xs={12} md={6}>
                        <AddShort shortenLink={shortenLink} Error={Error} />
                    </Col>
                    
                    <Col xs={12} md={6}>
                        <DisplayShort Links={Links} onDelete={deleteLink} />
                    </Col>
                </Row>
            </Container>
            <AppFooter />
        </div>

    )
}

const styles = {
    container: {
        flexGrow: 1,
        height: "100%"
    },
    row: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}

export default Main
