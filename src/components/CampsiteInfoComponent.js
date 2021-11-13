import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {
    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card onClick={() => this.onCampsiteSelect(campsite)}>
                    <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                    <CardImgOverlay>
                        <CardTitle>{campsite.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        )
    }
    
    render() {
        if(this.props.campsite) {
            return (
                <div className="row">
                    { this.renderCampsite(this.props.campsite) }
                </div>
            )
        }
        return <div></div>
    }
}

export default CampsiteInfo;