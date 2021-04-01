import { Table, Container, Row, Col, Button } from 'react-bootstrap'
import GraphModal from './GraphModal'
import { useState } from 'react'

function DisplayShort({ Links, onDelete }) {
    const [OpenModal, setOpenModal] = useState(false);
    const [Data, setData] = useState({})
    const copiedToClipboard = (shortURL) => {
        navigator.clipboard.writeText(window.location.host + "/" + shortURL)
        window.alert('Copied to Clipboard')
    }

    const setGraphData = (link) => {
        setOpenModal(true)
        setData(link)
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <Container style={styles.container} fluid>
            <Row>
                <Col>
                    <Table responsive >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Full URL</th>
                                <th>Short URL</th>
                                <th>Redirected</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Links ?
                                    (Links.map((link, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td style={styles.column}>{link.fullURL}</td>
                                            <td>{link.shortURL}</td>
                                            <td>{link.redirects ? link.redirects.length : 0}</td>
                                            <td style={styles.action}>
                                                {
                                                    link.redirects && link.redirects.length > 0 ?
                                                        <Button style={styles.btn} variant="secondary" onClick={() => setGraphData(link)}>Check</Button> : null
                                                }
                                                <Button style={styles.btn} variant="secondary" onClick={() => copiedToClipboard(link.shortURL)}>Copy</Button>
                                                <Button style={styles.btn} variant="secondary" onClick={() => onDelete(link.id)}>X</Button>
                                            </td>
                                        </tr>
                                    ))) :
                                <tr>No Data</tr>}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <GraphModal Data={Data} OpenModal={OpenModal} closeModal={closeModal}></GraphModal>
        </Container>
    )
}

const styles = {
    container: {
        height: "100%",
        overflow: "auto",
        maxHeight: "60vh",
        margin: "30px 0"
    },
    action: {
        display: "flex"
    },
    btn: {
        padding: "0px 7px",
        margin: "0 2px"
    },
    column: {
        maxWidth: "200px",
        overflowX: "auto"
    }
}

export default DisplayShort
