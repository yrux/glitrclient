import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.biolimit=200;
        this.welcomelimit=200;
        this.usernameexistance=false;
        this.checkusernameapi;
        this.logoutuser = this.logoutuser.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.updatethumb = this.updatethumb.bind(this);
        this.updatecardthumb = this.updatecardthumb.bind(this);
    }
    state = JSON.parse('{"status":true,"data":{"publicUsername":null,"userStatus":true,"profilePassword":"","contactNumber":"","isSeller":false,"country":"","address":"","city":"","state":"","zip":"","website":"","twitter":"","instagram":"","dateOfBirth":null,"userPath":"","subTitle":"","tags":"","bio":"","responseDays":null,"price":null,"dateCreated":null,"lastVisited":null,"holdingPhotoPath":null,"profilePicture":null,"stripeCustomerId":null,"userSignupStage":null,"sellerTypePreference":"WFM","approvedForAppView":null,"appViewEnabled":true,"subscriptionPrice":null,"thumbPath":"","shoutoutPrice":null,"userType":1,"shoutoutEnabled":false,"profilePrivacy":null,"profileCardPath":null,"subscriptionEnabled":false,"welcomeMessage":"","parentUserID":null,"_id":"","firstName":"","lastName":"","fullName":"","email":"","userName":"","password":"","createdAt":"","updatedAt":"","__v":0,"subscriptionOptions":[]},"token":""}');
    updatedlinks(){
        var _links =0;
        if(this.state.data.website){
            _links+=1;
        }
        if(this.state.data.facebook){
            _links+=1;
        }
        if(this.state.data.twitter){
            _links+=1;
        }
        if(this.state.data.instagram){
            _links+=1;
        }
        return _links;
    }
    updatecardthumb(){
        var data = new FormData();
        const fileField = document.querySelector('input[name="cardthumbpath"]');
        data.append("holdingPhotoPath", fileField.files[0]);
        data.append("firstName", this.state.data.firstName);
        data.append("lastName", this.state.data.lastName);
        this.updateprofiledata(data);
    }
    updatethumb(){
        var data = new FormData();
        const fileField = document.querySelector('input[name="thumbpath"]');
        data.append("profilePicture", fileField.files[0]);
        data.append("firstName", this.state.data.firstName);
        data.append("lastName", this.state.data.lastName);
        this.updateprofiledata(data);
    }
    updateprofiledata(data){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('authcode'));
        fetch('http://54.175.129.249:8000/api/user/'+this.state.data['_id'], {
            method: 'PUT',
            redirect: 'follow',
            headers: myHeaders,
            /*headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },*/
            body: data,
        }).then(response => response.json()).then((e)=>{
           this.setState({data:e.data});
           var _localstorage = JSON.parse(localStorage.getItem('userdata'));
           _localstorage.data=e.data;
           localStorage.setItem('userdata',JSON.stringify(_localstorage));
           alert('Profile Updated');
        });
    }
    logoutuser() {
        localStorage.clear();
        Router.push('/login');
    }
    saveProfile(){
        /*this.state.data.fullName
        this.state.data.userName
        this.state.data.bio
        this.state.data.profilePrivacy*/
        //console.log(this.state.data['_id']);
        var data = new FormData();
        data.append("firstName", this.state.data.firstName);
        data.append("lastName", this.state.data.lastName);
        data.append("userName", this.state.data.userName);
        data.append("facebook", this.state.data.facebook);
        data.append("instagram", this.state.data.instagram);
        data.append("twitter", this.state.data.twitter);
        data.append("website", this.state.data.website);
        data.append("bio", this.state.data.bio);
        data.append("profilePrivacy", parseInt(this.state.data.profilePrivacy));
        data.append("shoutoutPrice", this.state.data.shoutoutPrice);
        data.append("shoutoutEnabled", this.state.data.shoutoutEnabled);
        data.append("subscriptionEnabled", this.state.data.subscriptionEnabled);
        data.append("subscriptionPrice", this.state.data.subscriptionPrice);
        data.append("welcomeMessage", this.state.data.welcomeMessage);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+localStorage.getItem('authcode'));
        fetch('http://54.175.129.249:8000/api/user/'+this.state.data['_id'], {
            method: 'PUT',
            redirect: 'follow',
            headers: myHeaders,
            /*headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },*/
            body: data,
        }).then(response => response.json()).then((e)=>{
           this.setState({data:e.data});
           var _localstorage = JSON.parse(localStorage.getItem('userdata'));
           _localstorage.data=e.data;
           localStorage.setItem('userdata',JSON.stringify(_localstorage));
           alert('Profile Updated');
        });
    }
    /*static async getInitialProps(ctx) {
        return await new Promise(function(resolve, reject) {
            resolve(localStorage.getItem('userdata'));
        });
    }*/
    componentDidMount(){
        if(!localStorage.getItem('authcode')){
            Router.push('/');
            return;
        }
        this.setState(JSON.parse(localStorage.getItem('userdata')));
    }
    render() {
        return (
             <>
                <Head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Social Links</title>
                    <link rel="icon" href="/favicon.ico" />
                    <script src="js/all.min.js"></script>
                </Head>
                 <div className="backBtn">
                                            <Link href="/dashboard"><i class="fa fa-arrow-left" aria-hidden="true"></i></Link>
                                                </div>
                <section className="main-sec">
                    <div className="container-fluid">
                        <div className="col-md-12 col-xs-12 l-padd-0 r-padd-0">
                            <div className="third-col">
                            <div className="tab-content">
                                <div className="tab-pane active" id="social">
                                    <div className="scrollbar" id="style-3">
                                        <div className="force-overflow">
                                            <h2><img src="images/profile-heading-img.png" alt="profile-heading-img"/>Social Links
                                            </h2>
                                                <div className="form-group mb-3">
                                                    <label>Instagram</label>
                                                    <div className="row nav-flex">
                                                        <div className="col-md-2 col-xs-2">
                                                            <i className="fa fa-instagram social-icon insta"></i>
                                                        </div>
                                                        <div className="col-md-10 col-xs-10">
                                                            <input type="text" className="form-control"
                                                                value={this.state.data.instagram} onChange={(e)=>{
                                                                    this.setState({
                                                                      data: {
                                                                        ...this.state.data,
                                                                        instagram: e.target.value,
                                                                      },
                                                                    });
                                                                }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Facebook</label>
                                                    <div className="row nav-flex">
                                                        <div className="col-md-2 col-xs-2">
                                                            <i className="fa fa-facebook social-icon fb"></i>
                                                        </div>
                                                        <div className="col-md-10 col-xs-10">
                                                            <input type="text" className="form-control"
                                                                value={this.state.data.facebook} onChange={(e)=>{
                                                                    this.setState({
                                                                      data: {
                                                                        ...this.state.data,
                                                                        facebook: e.target.value,
                                                                      },
                                                                    });
                                                                }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Twitter</label>
                                                    <div className="row nav-flex">
                                                        <div className="col-md-2 col-xs-2">
                                                            <i className="fa fa-twitter social-icon twitter"></i>
                                                        </div>
                                                        <div className="col-md-10 col-xs-10">
                                                            <input type="text" className="form-control"
                                                                value={this.state.data.twitter} onChange={(e)=>{
                                                                    this.setState({
                                                                      data: {
                                                                        ...this.state.data,
                                                                        twitter: e.target.value,
                                                                      },
                                                                    });
                                                                }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group mb-3">
                                                    <label>Your Website</label>
                                                    <div className="row nav-flex">
                                                        <div className="col-md-2 col-xs-2">
                                                            <i className="fa fa-globe social-icon web"></i>
                                                        </div>
                                                        <div className="col-md-10 col-xs-10">
                                                            <input type="text" className="form-control" onChange={(e)=>{
                                                                    this.setState({
                                                                      data: {
                                                                        ...this.state.data,
                                                                        website: e.target.value,
                                                                      },
                                                                    });
                                                                }} value={this.state.data.website}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="btns btns-1">
                                                    <ul className="list-inline">
                                                        <li><button onClick={this.saveProfile} className="primary-btn"><i className="fa fa-check-circle-o"
                                                                    aria-hidden="true"></i> Save</button></li>
                                                        <li><a href="#" className="secondary-btn">Cancel</a></li>
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
                <script src="js/main.js" async></script>
            </>
        )
    }
}
export default Toggle