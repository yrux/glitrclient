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
        this.isnullorempty = this.isnullorempty.bind(this);
    }
    state = JSON.parse('{"status":true,"data":{"publicUsername":null,"userStatus":true,"profilePassword":"","contactNumber":"","isSeller":false,"country":"","address":"","city":"","state":"","zip":"","website":"","twitter":"","instagram":"","dateOfBirth":null,"userPath":"","subTitle":"","tags":"","bio":"","responseDays":null,"price":null,"dateCreated":null,"lastVisited":null,"holdingPhotoPath":null,"profilePicture":null,"stripeCustomerId":null,"userSignupStage":null,"sellerTypePreference":"WFM","approvedForAppView":null,"appViewEnabled":true,"subscriptionPrice":null,"thumbPath":"","shoutoutPrice":null,"userType":1,"shoutoutEnabled":false,"profilePrivacy":null,"profileCardPath":null,"subscriptionEnabled":false,"welcomeMessage":"","parentUserID":null,"_id":"","firstName":"","lastName":"","fullName":"","email":"","userName":"","password":"","createdAt":"","updatedAt":"","__v":0,"subscriptionOptions":[]},"token":""}');
    isnullorempty(_obj){
        if(_obj===null){
            return true;
        }
        if(_obj==''){
            return true;
        }
        return false;
    }
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
        data.append("profilePrivacy", parseInt(this.isnullorempty(this.state.data.profilePrivacy)?0:this.state.data.profilePrivacy));
        data.append("shoutoutPrice", this.isnullorempty(this.state.data.shoutoutPrice)?0:this.state.data.shoutoutPrice);
        data.append("shoutoutEnabled", this.state.data.shoutoutEnabled);
        data.append("subscriptionEnabled", this.state.data.subscriptionEnabled);
        data.append("subscriptionPrice", this.isnullorempty(this.state.data.subscriptionPrice)?0:this.state.data.subscriptionPrice);
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
                    <title>Dashboard</title>
                    <link rel="icon" href="/favicon.ico" />
                    <script src="js/all.min.js"></script>
                </Head>
                <header className="header">
                    <div className="bottom-row">
                        <div className="container-fluid">
                            <div className="row nav-flex">
            
                                <div className="mobile-nav">
                                    <div className="mobile-header">
                                        <div className="mobile-close">
                                            <i className="fa fa-times"></i>
                                        </div>
                                    </div>
                                    <div className="mobile-body"></div>
                                </div>
            
                                <div className="col-md-2 clas-sm-12 col-xs-12">
                                    <div className="logo">
                                        <Link href="/dashboard"><img src="images/logo.png" alt="logo" /></Link>
                                    </div>
                                    <div className="hamburger hidden-lg hidden-md">
                                        <i className="fa fa-cog"></i>
                                    </div>
                                </div>
                                <div className="col-md-7 hidden-sm hidden-xs">
                                    <div className="navigation-list">
                                        <ul className="list-inline">
                                            <li><a href="#"><i className="fa fa-th-large" aria-hidden="true"></i> Dashboard</a></li>
                                            <li className="active"><a href="#"><i className="fa fa-address-book-o" aria-hidden="true"></i>
                                                    Profile</a></li>
                                            <li><a href="#"><i className="fa fa-commenting" aria-hidden="true"></i> Chats</a></li>
                                            <li><a><i className="fa fa-bullhorn" aria-hidden="true"></i> Shoutouts</a></li> 
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 hidden-sm hidden-xs">
                                    <div className="navigation-list-other">
                                        <ul className="list-inline">
                                            <li><a href="#">Account</a></li>
                                            <li><a href="#">Marketing</a></li>
                                            <li><a href="#">Support</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="main-sec">
                    <div className="container-fluid">
                        <div className="col-md-1 col-xs-12 r-padd-0 l-padd-0 hidden-sm visible-md hidden-xs visible-lg">
                            <div className="first-col">
                                <ul>
                                    <li><a href="#"><img className="img-responsive" src={this.isnullorempty(this.state.data.profilePicture)?'images/avatar-img.png':this.state.data.profilePicture} alt="user-img-side" /></a></li>
                                    <li><a href="#"><i className="fa fa-th-large" aria-hidden="true"></i></a></li>
                                    <li className="active"><a href="#"><i className="fa fa-address-book-o" aria-hidden="true"></i>
                                        </a></li>
                                    <li><a href="#" className="message-btn"><i className="fa fa-commenting" aria-hidden="true"></i>
                                            <span>3</span></a></li>
                                    <li><a href="#"><i className="fa fa-bullhorn" aria-hidden="true"></i></a></li>
                                    <li><button className="btn btn-danger" onClick={this.logoutuser}><i className="fa fa-sign-out" aria-hidden="true"></i></button></li> 
                                </ul>
                                <a href="#" className="setting-btn"><i className="fa fa-cog" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12 l-padd-0 r-padd-0">
                            <div className="second-col">
                                <div className="user-thumbnail mb-5">
                                    <div className="user-img">
                                        <img src={this.isnullorempty(this.state.data.profilePicture)?'images/avatar-img.png':this.state.data.profilePicture} className="img-responsive" alt="user-img"/>
                                    </div>
                                    <article>
                                        <h3>{this.state.data.fullName}</h3>
                                        <a href="#">@{this.state.data.userName}</a>
                                    </article>
                                </div>
                                <div className="navigation-tabs">
                                    <ul className="nav panel-tabs">
                                        <li className="active">
                                            <a className="visible-lg visible-md visible-sm hidden-xs" href="#profile" data-toggle="tab" aria-expanded="true">
                                                <h4>Profile & Bio</h4>
                                                <h5>{this.state.data.fullName}</h5>
                                            </a>
                                            <Link href="/profilebio">
                                                <a className="visible-xs hidden-sm hidden-md hidden-lg">
                                                    <h4>Profile & Bio</h4>
                                                    <h5>{this.state.data.fullName}</h5>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="">
                                            <a className="visible-lg visible-md visible-sm hidden-xs" href="#photos" data-toggle="tab" aria-expanded="false">
                                                <h4>Profile Photos</h4>
                                                <h5>Updated: <span>12/12/20</span></h5>
                                            </a>
                                            <Link href="/profilephotos">
                                                <a className="visible-xs hidden-sm hidden-md hidden-lg">
                                                    <h4>Profile Photos</h4>
                                                    <h5>Updated: <span>12/12/20</span></h5>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="">
                                            <a className="visible-lg visible-md visible-sm hidden-xs" href="#social" data-toggle="tab" aria-expanded="false">
                                                <h4>Social Links</h4>
                                                <h5>{this.updatedlinks()} Links Completed</h5>
                                            </a>
                                            <Link href="/sociallinks">
                                                <a className="visible-xs hidden-sm hidden-md hidden-lg">
                                                    <h4>Social Links</h4>
                                                    <h5>{this.updatedlinks()} Links Completed</h5>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="">
                                            <a className="visible-lg visible-md visible-sm hidden-xs" href="#subscription" data-toggle="tab" aria-expanded="false">
                                                <h4>Subscription Pricing</h4>
                                                <h5>${this.state.data.subscriptionPrice}</h5>
                                            </a>
                                            <Link href="/subscriptionpricing">
                                                <a className="visible-xs hidden-sm hidden-md hidden-lg">
                                                    <h4>Subscription Pricing</h4>
                                                    <h5>${this.state.data.subscriptionPrice}</h5>
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="">
                                            <a className="visible-lg visible-md visible-sm hidden-xs" href="#shoutout" data-toggle="tab" aria-expanded="false">
                                                <h4>Shoutout Pricing</h4>
                                                <h5>${this.state.data.shoutoutPrice}</h5>
                                            </a>
                                            <Link href="/shoutoutpricing">
                                                <a className="visible-xs hidden-sm hidden-md hidden-lg">
                                                    <h4>Shoutout Pricing</h4>
                                                    <h5>${this.state.data.shoutoutPrice}</h5>
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5  col-sm-9 col-xs-12 l-padd-0 r-padd-0 hidden-xs">
                            <div className="third-col">
                            <div className="tab-content">
                                <div className="tab-pane active" id="profile">
                                    <div className="scrollbar" id="style-3">
                                        <div className="force-overflow">
                                            <h2><img src="images/profile-heading-img.png" alt="profile-heading-img"/>Profile &
                                                Bio</h2>
                                                <div className="form-group mb-3">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" onChange={(e)=>{
                                                        this.setState({
                                                          data: {
                                                            ...this.state.data,
                                                            firstName: e.target.value,
                                                          },
                                                        });
                                                    }} value={this.state.data.firstName} />
                                                </div>
                                                
                                                <div className="form-group mb-3">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" onChange={(e)=>{
                                                        this.setState({
                                                          data: {
                                                            ...this.state.data,
                                                            lastName: e.target.value,
                                                          },
                                                        });
                                                    }} value={this.state.data.lastName} />
                                                </div>

                                                <div className="form-group username mb-3">
                                                    <label>Username {this.usernameexistance===true&&<small><i className="fa fa-exclamation-circle"
                                                                aria-hidden="true"></i>
                                                            Sorry, username taken</small>}</label>
                                                    <div className="input-group">
                                                        <span className="input-group-addon" id="basic-addon1">@</span>
                                                        <input type="text" className="form-control" onChange={(e)=>{
                                                            this.setState({
                                                              data: {
                                                                ...this.state.data,
                                                                userName: e.target.value,
                                                              },
                                                            });
                                                            clearInterval(this.checkusernameapi);
                                                            this.checkusernameapi = setInterval(async (e)=>{
                                                                clearInterval(this.checkusernameapi);
                                                                var data = new FormData();
                                                                data.append("username", this.state.data.userName);
                                                                var myHeaders = new Headers();
                                                                myHeaders.append("Authorization", "Bearer "+localStorage.getItem('authcode'));
                                                                var _checkuser=await fetch('http://54.175.129.249:8000/api/user/check-username', {
                                                                    method: 'POST',
                                                                    redirect: 'follow',
                                                                    headers: myHeaders,
                                                                    body: data,
                                                                });
                                                                this.usernameexistance=!_checkuser.status;
                                                            },300,e);
                                                        }} value={this.state.data.userName} aria-describedby="basic-addon1"/>
                                                    </div>
                                                </div>

                                                <div className="form-group url mb-3">
                                                    <label>Profile URL</label>
                                                    <input type="text" className="form-control url-1" value="www.glitir.com/"/>
                                                    <input type="text" className="form-control url-2" value={this.state.data.userName}/>
                                                    <a href="#" className="form-btn-link"><i className="fa fa-link"
                                                            aria-hidden="true"></i> Copy Link</a>
                                                </div>

                                                <div className="form-group message mb-3">
                                                    <label>Biography</label>
                                                    <textarea onChange={(e)=>{
                                                        if(e.target.value.length<=this.biolimit){
                                                            this.setState({
                                                              data: {
                                                                ...this.state.data,
                                                                bio: e.target.value,
                                                              },
                                                            });
                                                        }
                                                    }} className="form-control" value={this.state.data.bio} name="bio" rows="6">{this.state.data.bio}</textarea>
                                                    <small><span>{(this.biolimit-(this.isnullorempty(this.state.data.bio)?0:this.state.data.bio.length))}</span> / 200</small>
                                                </div>

                                                <div className="form-group privacy mb-3">
                                                    <label>Privacy Settings</label>
                                                    <select onChange={
                                                        (e)=>{
                                                            this.setState({
                                                              data: {
                                                                ...this.state.data,
                                                                profilePrivacy: e.target.value,
                                                              },
                                                            });
                                                        }} value={this.state.data.profilePrivacy} className="form-control">
                                                        <option value="0">Please choose your settings</option>
                                                        <option value="1">Make profile public</option>
                                                        <option value="2">View with link only</option>
                                                        <option value="3">View with password only</option>
                                                    </select>
                                                </div>

                                                <div className="btns">
                                                    <ul className="list-inline">
                                                        <li><a href="#" className="secondary-btn">Cancel</a></li>
                                                        <li>{this.usernameexistance===false&&<button onClick={this.saveProfile} className="primary-btn"><i className="fa fa-check-circle-o"
                                                                    aria-hidden="true"></i> Save</button>}</li>
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="photos">
                                    <div className="scrollbar" id="style-3">
                                        <div className="force-overflow">
                                            <h2><img src="images/profile-heading-img.png" alt="profile-heading-img"/>Profile
                                                Photos</h2>
                                            <div className="avatar-box mb-6">
                                                <div className="row nav-flex">
                                                    <div className="col-md-4 col-xs-4">
                                                        <div className="avatar-img">
                                                            <img src={this.isnullorempty(this.state.data.profilePicture)?'images/avatar-img.png':this.state.data.profilePicture} className="img-responsive"
                                                                alt="avatar-img"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7 col-xs-7">
                                                        <div className="avatar-content">
                                                            <a href="#" className="primary-btn mb-1">Update Profile Photo</a>
                                                            <p>Must be JPEG, PNG, or GIF and cannot exceed 5MB.</p>
                                                            <input type="file" name="thumbpath" onChange={this.updatethumb} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="photo-box">
                                                <div className="row nav-flex">
                                                    <div className="col-md-6 col-xs-12">
                                                        <div className="photo-img">
                                                            <img src={!this.isnullorempty(this.state.data.holdingPhotoPath)?this.state.data.holdingPhotoPath:'images/photo-img.jpg'} className="img-responsive"
                                                                alt="photo-img"/>
                                                            <div className="overlay">
                                                                { this.isnullorempty(this.state.data.holdingPhotoPath) && <><img src="images/camer-icon.png" alt="camera-icon"/>
                                                                <p>Please add a <a href="#">Card Photo</a> before going Live </p></>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-xs-12">
                                                        <div className="photo-content">
                                                            <a type="file" id="myfile" name="myfile" href="#" className="primary-btn mb-1">Update Card Photo</a>
                                                            <p>Must be JPEG, PNG, or GIF and cannot exceed 5MB.</p>
                                                            <input type="file" name="cardthumbpath" onChange={this.updatecardthumb} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="social">
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
                                                <div className="btns">
                                                    <ul className="list-inline">
                                                        <li><a href="#" className="secondary-btn">Cancel</a></li>
                                                        <li><button onClick={this.saveProfile} className="primary-btn"><i className="fa fa-check-circle-o"
                                                                    aria-hidden="true"></i> Save</button></li>
                                                    </ul>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="subscription">
                                   <div className="scrollbar" id="style-4">
                                       <div className="suscrip-blk">
                                       <h5 className="subs-pric"><img src="images/profile-heading-img.png" alt="profile-heading-img"/>Subscription Pricing</h5>

                                       <div className="swich-blk">
                                           <h6><i className="fa fa-commenting-o" aria-hidden="true"></i>Enable Subscriptions</h6>
                                           <div className="button-switch">
                                              <input 
                                                onChange={(e)=>{
                                                    this.setState({
                                                      data: {
                                                        ...this.state.data,
                                                        subscriptionEnabled: !this.state.data.subscriptionEnabled,
                                                      },
                                                    });
                                                }} 
                                                type="checkbox" 
                                                name="subscriptionEnabled" 
                                                id="switch-blue" 
                                                className="switch" 
                                                checked={this.state.data.subscriptionEnabled}
                                                />
                                              <label for="switch-blue" className="lbl-off"></label>
                                              <label for="switch-blue" className="lbl-on"></label>
                                            </div>
                                       </div>

                                       <div className="strt-pric">
                                          <h5>Subscription Starting Price</h5>
                                          <div className="input-group">
                                           <span className="input-group-addon" id="basic-addon1">$</span>
                                            <input type="text" className="form-control"  value={this.state.data.subscriptionPrice} onChange={(e)=>{
                                                this.setState({
                                                  data: {
                                                    ...this.state.data,
                                                    subscriptionPrice: e.target.value,
                                                  },
                                                });
                                            }} aria-describedby="basic-addon1"/>
                                           </div> 
                                       </div>
                                       <div className="form-group message mb-3">
                                                    <label>Subscription Welcome Message</label>
                                                    <textarea onChange={(e)=>{
                                                        if(e.target.value.length<=this.welcomelimit){
                                                            this.setState({
                                                              data: {
                                                                ...this.state.data,
                                                                welcomeMessage: e.target.value,
                                                              },
                                                            });
                                                        }
                                                    }} className="form-control" value={this.state.data.welcomeMessage} name="welcomeMessage" rows="6">{this.state.data.welcomeMessage}</textarea>
                                                    <small><span>{(this.welcomelimit-(this.isnullorempty(this.state.data.welcomeMessage)?0:this.state.data.welcomeMessage.length))}</span> / {this.welcomelimit}</small>
                                                </div>

                                                <div className="btns subs-btn">
                                                    <ul className="list-inline">
                                                        <li><button onClick={this.saveProfile} className="primary-btn"><i className="fa fa-check-circle-o"
                                                                    aria-hidden="true"></i> Save</button></li>
                                                        <li><a href="#" className="secondary-btn">Cancel</a></li>
                                                    </ul>
                                                </div>

                                                <div className="addon-subs">
                                                    <h5>Additional Subscription Levels</h5>
                                                    <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <span>$9.99</span>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h6><i className="fa fa-check-circle" aria-hidden="true"></i>Alexis Plus Members</h6>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <a href="#" className="form-btn-link"><i className="fa fa-link" aria-hidden="true"></i> Edit</a>
                                                        </div>
                                                    </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <span>$9.99</span>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h6><i className="fa fa-times-circle" aria-hidden="true"></i>Alexis Plus Members</h6>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <a href="#" className="form-btn-link"><i className="fa fa-link" aria-hidden="true"></i> Edit</a>
                                                        </div>
                                                    </div>
                                                    </div>

                                                    <a className="add-lvl" href=""><i className="fa fa-plus-circle" aria-hidden="true"></i>Add New Level</a>

                                                </div>
                                    
                                    </div>
                                   </div> 
                                </div>


                                <div className="tab-pane" id="shoutout">
                                    
                                    <div className="scrollbar" id="style-5">
                                       <div className="suscrip-blk">
                                       <h5 className="subs-pric"><img src="images/profile-heading-img.png" alt="profile-heading-img"/>Enable Shoutouts</h5>

                                       <div className="swich-blk">
                                           <h6><i className="fa fa-commenting-o" aria-hidden="true"></i>Enable Subscriptions</h6>
                                           <div className="button-switch">
                                              <input 
                                                onChange={(e)=>{
                                                    this.setState({
                                                      data: {
                                                        ...this.state.data,
                                                        shoutoutEnabled: !this.state.data.shoutoutEnabled,
                                                      },
                                                    });
                                                }} 
                                                type="checkbox" 
                                                name="shoutoutEnabled" 
                                                id="switch-blue" 
                                                className="switch" 
                                                checked={this.state.data.shoutoutEnabled}
                                                />
                                              <label for="switch-blue" className="lbl-off"></label>
                                              <label for="switch-blue" className="lbl-on"></label>
                                            </div>
                                       </div>

                                       <div className="strt-pric">
                                          <h5>Shoutout Starting Price</h5>
                                          <div className="input-group">
                                           <span className="input-group-addon" id="basic-addon1">$</span>
                                            <input type="text" className="form-control" onChange={(e)=>{
                                                this.setState({
                                                  data: {
                                                    ...this.state.data,
                                                    shoutoutPrice: e.target.value,
                                                  },
                                                });
                                            }} value={this.state.data.shoutoutPrice} aria-describedby="basic-addon1"/>
                                           </div> 
                                       </div>

                                                <div className="btns subs-btn shoutout-btn">
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
                        <div className="col-md-3 hidden-sm col-xs-12 l-padd-0 r-padd-0 hidden-xs">
                            <div className="forth-col">
                                <h4><i className="fa fa-calendar"></i> <span>Joined:</span> 12/01/2002</h4>
                                <div className="boxes color-theme-1 mb-4">
                                    <div className="row nav-flex">
                                        <div className="col-md-5 col-xs-5 r-padd-0">
                                            <div className="box-count">
                                                <h3>18,175</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-xs-7">
                                            <div className="box-content">
                                                <h5>Active Suscribers</h5>
                                                <p>December 2020</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="boxes color-theme-2 mb-4">
                                    <div className="row nav-flex">
                                        <div className="col-md-5 col-xs-5 r-padd-0">
                                            <div className="box-count">
                                                <h3>18,175</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-xs-7">
                                            <div className="box-content">
                                                <h5>Active Suscribers</h5>
                                                <p>December 2020</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="boxes color-theme-2 mb-4">
                                    <div className="row nav-flex">
                                        <div className="col-md-5 col-xs-5 r-padd-0">
                                            <div className="box-count">
                                                <h3>18,175</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-xs-7">
                                            <div className="box-content">
                                                <h5>Active Suscribers</h5>
                                                <p>December 2020</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="boxes color-theme-3">
                                    <div className="row nav-flex">
                                        <div className="col-md-5 col-xs-5 r-padd-0">
                                            <div className="box-count">
                                                <h3>18,175</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-xs-7">
                                            <div className="box-content">
                                                <h5>Active Suscribers</h5>
                                                <p>December 2020</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                          <div className="col-md-1 col-xs-12 r-padd-0 l-padd-0 hidden-sm hidden-md hidden-lg visible-xs">
                <div className="first-col footericons">
                    <ul>
                        <li>
                            <a href="#"><img src="images/bottomicon1.png" className="img-responsive" /></a>
                            <small>BROWSE</small>
                        </li>
                        <li>
                            <a href="#"><img src="images/bottomicon2.png" className="img-responsive" /></a>
                            <small>MY CHATS</small>
                        </li>
                        <li>
                            <a href="#"><img src="images/bottomicon3.png" className="img-responsive" /></a>
                            <small>SHOUT OUTS</small>
                        </li>
                        <li>
                            <a href="#"><img src="images/bottomicon4.png" className="img-responsive" /></a>
                            <small>PROFILE</small>
                        </li>
                        <li>
                            <a href=""  onClick={this.logoutuser}><img src="images/bottomicon5.png" className="img-responsive" /></a>
                            <small>LOGOUT</small>
                        </li>
                    </ul>
                    
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