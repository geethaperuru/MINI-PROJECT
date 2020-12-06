
import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

    state ={
        formdata:{
            role: 'Admin',
            email:'',
            password:''
        }
    }

    handleInput = (event,name)=>{
        const newformdata = {...this.state.formdata}
        newformdata[name] = event.target.value;
        this.setState({
            formdata:newformdata
        })
    }

    submitForm = (e) =>{
        e.preventDefault();
        //console.log(this.state.formdata)
        const email = this.state.formdata.email;
        const password = this.state.formdata.password;

        console.log(email)
        if(this.state.formdata.role==="Admin")
        {
            axios({
                method: "get",
                url: "api/admin/login",
                params: {
                source_content_type: 'application/json',
                email: email,
                password : password
                }
                }).then(res => console.log(res.data));
            // const request = axios.get('/api/admin/login',{'email':'khaja','password':password})
            //         .then(response=>response.data);
            // console.log(request);
        }
    }

    render() {
        return (
            <div>
                <h2>Enter the Details</h2>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label>Select Your Role : </label>
                        <select value={this.state.formdata.role}
                        onChange={(event)=>this.handleInput(event,'role')}>
                            <option value="admin">Admin</option>
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder="Enter your email"
                        value={this.state.formdata.email}
                        onChange={(event)=>this.handleInput(event,'email')}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Enter your password"
                        value={this.state.formdata.password}
                        onChange={(event)=>this.handleInput(event,'password')}/>
                    </div>
                    <button type="submit">Login</button>


                </form>
            </div>
        )
    }

}

export default Home;