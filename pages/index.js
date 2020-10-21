import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email : '',password : '',username:'',firstname:'',lastname:''};
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
    componentDidMount() {
        if(localStorage.getItem('authcode')){
            Router.push('/dashboard');
        }
    }
  handleClick() {
    fetch('http://54.175.129.249:8000/api/auth/signup', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: '{"email": "'+this.state.email+'","password":"'+this.state.password+'","firstName":"'+this.state.firstname+'","lastName":"'+this.state.lastname+'","userName":"'+this.state.username+'"}'
    }).then(response => response.json())
    .then((data)=>{
        if(data.status===true){
            /*login success*/
            //localStorage.setItem('authcode',data.token);
            //localStorage.setItem('userdata',JSON.stringify(data));
            alert('Registration successful');
            Router.push('/login');
        }else{
            /*login failed*/
            alert('Registration failed');
        }
    });
  }
  render() {
    return (
      <div>
      <div  className="container">
      <Head>
      <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div class="register-form-sec">
            <div class="form-group">
                <label>User Name</label>
                <input type="text" class="form-control" onChange={(e)=>{ this.setState({username:e.target.value}) }} value={this.state.username} placeholder="User Name" />
            </div>
            
            <div class="form-group">
                <label>First Name</label>
                <input type="text" onChange={(e)=>{ this.setState({firstname:e.target.value}) }} value={this.state.firstname} class="form-control" placeholder="First Name" />
            </div>
            
            <div class="form-group">
                <label>Last Name</label>
                <input type="text" class="form-control" onChange={(e)=>{ this.setState({lastname:e.target.value}) }} value={this.state.lastname} placeholder="Last Name" />
            </div>
            
            <div class="form-group">
                <label>Email</label>
                <input type="email" onChange={(e)=>{ this.setState({email:e.target.value}) }} value={this.state.email} class="form-control" placeholder="Email" />
            </div>
            
            <div class="form-group">
                <label>Password</label>
                <input type="password" onChange={(e)=>{ this.setState({password:e.target.value}) }} value={this.state.password} class="form-control" placeholder="Password" />
            </div>
            
            
            <div class="form-group">
                <p className="description">Already Registerd? <Link href="/login">Login</Link></p>
            </div>
            
            <div class="form-group">
                <div class="button-register">
                    <button type="button" onClick={this.handleClick}>Register</button>
                </div>
            </div>
            
        </div>
        </div>
        </div>
    );
  }
}

export default Toggle