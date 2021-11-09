import React, { Component } from 'react';
import { Card, CardImg, CArdImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import CardImgOverlay from 'reactstrap/lib/CardImgOverlay';

class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
            </div>
        );
    }
}

export default Directory;