import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { useState } from 'react'

const AddShort = ({ shortenLink, Error }) => {
    const [Full, setFull] = useState("")
    const [Short, setShort] = useState("")

    const submit = () => {
        shortenLink(Full, Short)
        setFull("")
        setShort("")
    }

    return (
        <Container style={styles.container} fluid>
            <Row style={styles.row}>
                <Col xs={10}>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Full URL" value={Full}
                            onChange={(e) => setFull(e.target.value)}
                            isInvalid={!!Error.Full}
                            />
                            <Form.Control.Feedback type="invalid">
                                {Error.Full}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="text" placeholder="Custom short URL (Optional)" value={Short}
                                onChange={(e) => setShort(e.target.value)}
                                isInvalid={!!Error.Short}
                            />
                            <Form.Control.Feedback type="invalid">
                                {Error.Short}
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                If leave blank, a random url will be genereated
                            </Form.Text>
                        </Form.Group>

                        <Button variant="success" onClick={submit}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Row style={styles.row} className="d-none d-sm-flex">
                 <Col xs={10}>
                    <Alert variant="info">
                        <Alert.Heading>Info about the services</Alert.Heading>
                        You will have to provide a Full link and a short link (optional).
                        If no custom short link is provided. A random (1sWsDc-) will be genereated.
                        Custom short link can only contain letters, numbers, dash, and underscore.
                        Please Understand. Thank you
                        <ul>
                            <li> Check: You can see the graph of redirect (analytics)</li>
                            <li> Copy: Same functionality as Ctrl + C, so you have manually press Ctrl + C</li>
                            <li> X: Same as Delete. Please be more careful</li>
                        </ul>
                    </Alert>
                </Col>
            </Row>
        </Container>
    )
}

const styles = {
    container: {
        margin: "30px 0"
    },
    row: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 0"
    }
}

export default AddShort
