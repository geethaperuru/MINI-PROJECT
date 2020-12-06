import React, { Component } from 'react';


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
    mapStateToProps = (state) => {
        return {
            formdata: state.formdata
        }
    }

    submitForm = (e) =>{
        e.preventDefault();
        //console.log(this.state.formdata)
        if(this.state.formdata.role==="Admin")
        {
            
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