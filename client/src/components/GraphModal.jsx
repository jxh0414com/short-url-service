import { Modal, Button } from 'react-bootstrap'
import Graph from './Graph'

function GraphModal({ OpenModal, closeModal, Data }) {
    return (
        <Modal
            animation={false}
            show={OpenModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={closeModal}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Short URL: ({ Data.shortURL }) To ({ Data.fullURL})
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Graph redirects={Data.redirects} />
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GraphModal
