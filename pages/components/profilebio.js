import React from 'react'
import { useState } from 'react'
class Profilebio extends React.Component {
    constructor(props) {
        super(props);
    }
    render(state) {
        return (
            <>
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
                                <small><span>{(this.biolimit-this.state.data.bio.length)}</span> / 200</small>
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
            </>
          )
    }
}
export default Profilebio