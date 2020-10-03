import React, { Component } from 'react'
import { connect } from 'react-redux'
import { scammer_detail } from '../actions/index'
import { bindActionCreators } from 'redux'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import '../static/css/scammer_detail.css'

class ScammerDetailContainer extends Component {



    moveNextCarousel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        var instance = M.Carousel.getInstance(document.querySelector('.carousel'));
        instance.next();
    }

    movePrevCarousel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        var instance = M.Carousel.getInstance(document.querySelector('.carousel'));
        instance.prev();
    }


    componentWillMount() {
        this.props.scammer_detail(this.props.id);
        console.log(this.props)
    }

    componentDidMount() {
        const options = {
            'fullWidth': true,
            'indicators': true,
            'pressed': true
        }
        var elems = document.querySelector('.carousel');
        var instances = M.Carousel.init(elems, options);
    }
    componentDidUpdate(prevProps, prevState) {
        var elems = document.querySelector('.carousel');
        const options = {
            'fullWidth': true,
            indicators: true,
            'pressed': true,
        }
        var instances = M.Carousel.init(elems, options);

    }



    render() {
        if (this.props.scammers.scammerDetail) {
            let scammer = this.props.scammers.scammerDetail;
            let imageCarousel = null
            if (scammer.image_urls.length > 0) {
                const images = scammer.image_urls.map((e, i) => {
                    return (
                        <a className="carousel-item" key={i} href={e} target="_blank"> <img key={i} className='ProofImage' src={e} /></a>

                    )
                });

                imageCarousel = (
                    <div className="carousel carousel-slider center " data-indicators="true">
                        <div className="carousel-fixed-item center middle-indicator">
                            <div className="left">
                                <a onClick={this.movePrevCarousel} className="movePrevCarousel waves-effect waves-light content-indicator"><i className="material-icons left  middle-indicator-text">chevron_left</i></a>
                            </div>

                            <div className="right">
                                <a onClick={this.moveNextCarousel} className="moveNextCarousel  waves-effect waves-light content-indicator"><i className="material-icons right middle-indicator-text">chevron_right</i></a>
                            </div>
                        </div>
                        {images}

                    </div>

                )
            }



            return (
                <div className="section">
                    <div className="row">
                    <div className="col l6 s12">
                        <h3 className="indigo-text">Proofs</h3>
                    {imageCarousel}
                    </div>

                    <div className="col l5 offset-l1">
                        <h3 className="indigo-text">Complete story</h3>
                        <p className="story">{scammer.details}</p>
                    </div>
                    </div>

                    <div className="row">
                        <div className="col l6 s12">
                        <h3 className="indigo-text">Phone number</h3>
                        <p>{scammer.phone}</p>
                        </div>
                        <div className="col l5 s12 offset-l1">
                        <h3 className="indigo-text">Address</h3>
                        <p>{scammer.address}</p>
                        </div>
                    </div>

                </div>





            )

        }
        else {
            return null
        }


    }


}


function mapStateToProps(state) {
    return {
        scammers: state.scammers
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ scammer_detail }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(ScammerDetailContainer)