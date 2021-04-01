import { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function Redirect() {
    let { short } = useParams();;
    const [Loading, setLoading] = useState(false)
    const [NotFound, setNotFound] = useState(false)
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            await axios.get(`/api/shorts/${short}`).then(({ data }) => {
                if (data.redirect.includes('http') || data.redirect.includes('https')) {
                    window.location = data.redirect
                } else {
                    window.location = "//" + data.redirect
                }
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                setNotFound(true)
                console.log(err)
            })
        }
        fetchData();
    }, [])

    const styles = {
        container: {
            width: "100vw",
            height: "100vh"
        },
        row: {
            width: "100%",
            height: "100%",
        },
        col: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }

    return (
        <Container style={styles.container}>
            <Row style={styles.row}>
                <Col style={styles.col}>
                    {
                        Loading ?
                            (<Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>)
                            : NotFound ? <div>Not Found</div> : ""
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Redirect
