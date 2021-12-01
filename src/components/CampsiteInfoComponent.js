import React, {Component} from 'react';
import { Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Button } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
          isModalOpen: false,
          rating: "",
          author: "",
          text: "",
          touched: {
              rating: false,
              author: false,
              text: false
          }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal () {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select defaultValue="1" className="form-control" model=".rating" name="rating" id="rating">
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="author">Your Name</Label>
                            <Control.text 
                                className="form-control"
                                placeholder="Your Name" 
                                model=".author" 
                                name="author" 
                                id="author"
                                validators= {{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}
                            />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                component="div"
                                messages={{
                                            required: "Required",
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                            />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="text">Comment</Label>
                            <Control.textarea className="form-control" model=".text" name="text" id="text" validators={{required}} />
                            <Errors
                                className="text-danger"
                                model=".text"
                                show="touched"
                                component="div"
                                messages={{
                                            required: "Required"
                                        }}
                            />
                        </div> 
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                    </ModalBody>
                </Modal>
                {/* Modal Btn */}
                <span>
                    <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg"></i> Submit Comment
                    </Button>
                </span>
                {/* End of Modal Btn */}
            </div>
        )
    }
}

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}
    
function RenderComments({comments, addComment, campsiteId}) {
    if(comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                { comments.map(comment =>
                    <p>
                        { comment.text } <br />
                        --{ comment.author }, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </p>
                ) }
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        )
    }
    return <div></div>
}

function CampsiteInfo(props) {
    if(props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
            </div>
                <div className="row">
                <RenderCampsite campsite={props.campsite} />
                <RenderComments 
                    comments={props.comments}
                    addComment={props.addComment}
                    campsiteId={props.campsite.id}
                />
            </div>
            </div>
        )
    }
    return <div></div>
}

export default CampsiteInfo;